import DelegateCallGameStorage from '../blockchain/contracts/Game.sol/DelegateCallGameStorage.json';
import {IDataToPay} from "../types/dataToPay";
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import fs from "fs";
import path from "path";
import {IGameDataBlockchain, IPlayerBlockchain} from "../types/blockchain";

@Injectable()
export class BlockchainService {

    private provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
    private providerToEvents = new ethers.WebSocketProvider('wss://sepolia.infura.io/ws/v3/6113828fd8e8448f9a9e3fa7962e2cc6');
    private contract: ethers.Contract | null = null;
    private readonly wallet: ethers.Wallet;
    private readonly logicArtifactPath = path.resolve(
        __dirname,
        '../blockchain/contracts/GameLogic.sol/GameLogic.json',
    );
    private readonly storageArtifactPath = path.resolve(
        __dirname,
        '../blockchain/contracts/Game.sol/DelegateCallGameStorage.json',
    );

    private lastGameData: { gameData: IGameDataBlockchain; players: IPlayerBlockchain[] } | null = null;
    private lastCallTimestamp = 0;
    private cooldownMs = 1000;

    public totalCalls = 0;
    public totalRpcCalls = 0;


    constructor(
    ) {
        const privateKey = process.env.OWNER_WALLET;
        this.wallet = new ethers.Wallet(privateKey as string, this.provider);
    }

    async deployGameLogicAddress(logicAddress: any) {
        if (!logicAddress) {
            const logicArtifact = JSON.parse(
                fs.readFileSync(this.logicArtifactPath, 'utf8'),
            );
            const GameLogicFactory = new ethers.ContractFactory(
                logicArtifact.abi,
                logicArtifact.bytecode,
                this.wallet,
            );
            const logicContract = await GameLogicFactory.deploy();
            await logicContract.waitForDeployment();
            logicAddress = await logicContract.getAddress();
        }

        return {
            logicAddress
        }
    }

    async deployGameStorageAddress(
        players: IPlayerBlockchain[],
        time1: number,
        time2: number,
        logicAddress: string,
    ) {

        const storageArtifact = JSON.parse(
            fs.readFileSync(this.storageArtifactPath, 'utf8'),
        );
        const DelegateCallGameStorageFactory = new ethers.ContractFactory(
            storageArtifact.abi,
            storageArtifact.bytecode,
            this.wallet,
        );
        const tokenAddress = process.env.TOKEN_ADDRESS;
        const contract = await DelegateCallGameStorageFactory.deploy(
            players,
            logicAddress,
            time1,
            time2,
            tokenAddress,
        );

        await contract.waitForDeployment();

        return await contract.getAddress();
    }

    async getGameData(contractAddress: string) {
        // this.logCounters();
        this.totalCalls++;

        const now = Date.now();

        if (now - this.lastCallTimestamp < this.cooldownMs && this.lastGameData) {
            return this.lastGameData;
        }

        this.contract = new ethers.Contract(contractAddress, DelegateCallGameStorage.abi, this.provider);

        try {
            this.totalRpcCalls++;

            const [
                [bettingMaxTime, gameMaxTime, createdAt, startedAt, finishedAt, isBettingComplete, isGameAborted, isGameFinished],
                [names, wallets, bets, isPaid, isPaidOut, results]
            ] = await Promise.all([
                this.contract['getGameData'](),
                this.contract['getAllPlayers']()
            ]);

            const players: IPlayerBlockchain[] = names.map((name: string, index: number) => ({
                name,
                wallet: wallets[index],
                bet: bets[index],
                isPaid: isPaid[index],
                isPaidOut: isPaidOut[index],
                result: results[index]
            }));

            const gameData: IGameDataBlockchain = {
                bettingMaxTime,
                gameMaxTime,
                createdAt,
                startedAt,
                finishedAt,
                isBettingComplete,
                isGameAborted,
                isGameFinished
            };

            const result = { gameData, players };

            // обновляем кеш и время последнего вызова
            this.lastGameData = result;
            this.lastCallTimestamp = now;

            return result;
        } catch (error) {
            console.error('Error fetching blockchain data:', error);

            // возвращаем кеш, если есть
            if (this.lastGameData) {
                return this.lastGameData;
            }

            throw error;
        }
    }

    // функция для логирования счетчиков
    // logCounters() {
    //     console.log(`Попытка: ${this.totalCalls}`);
    //     console.log(`вызов: ${this.totalRpcCalls}`);
    // }

    private paymentLocks: Record<string, Promise<void>> = {};

    async playerPayment(dataToPay: IDataToPay) {
        const { contractAddress } = dataToPay;

        while (this.paymentLocks[contractAddress]) {
            await this.paymentLocks[contractAddress];
        }

        let resolveLock: () => void;
        this.paymentLocks[contractAddress] = new Promise(res => resolveLock = res!);

        try {
            const { wallet, contractBet, privateKey } = dataToPay;

            const playerWallet = new ethers.Wallet(privateKey, this.provider);

            const tokenAbi = ["function approve(address spender, uint256 amount) external returns (bool)"];
            const token = new ethers.Contract(process.env.TOKEN_ADDRESS!, tokenAbi, playerWallet);
            const approveTx = await token.approve(contractAddress, ethers.parseUnits(contractBet, 18));
            await approveTx.wait();

            const contract = new ethers.Contract(contractAddress, DelegateCallGameStorage.abi, playerWallet);
            const depositTx = await contract.deposit();
            await depositTx.wait();

            const players = await contract.getAllPlayers();
            const playerIndex = players.wallets.indexOf(wallet);
            return players.isPaid[playerIndex];

        } catch (error) {
            throw new Error(`Payment error: ${error.message}`);
        } finally {
            resolveLock!();
            delete this.paymentLocks[contractAddress];
        }
    }



    getContract(contractAddress: string) {
        const contract = new ethers.Contract(
            contractAddress,
            DelegateCallGameStorage.abi,
            this.providerToEvents
        );

        if (!contract) throw new Error("Contract not initialized");

        return contract
    }

    async finish(data: { contractAddress: string; playerResults: any[] }) {
        const { contractAddress, playerResults } = data;

        const storageArtifact = require(this.storageArtifactPath);
        const abi = storageArtifact.abi;
        const contract = new ethers.Contract(contractAddress, abi, this.wallet);

        try {
            const tx = await contract.finish(playerResults);
            const receipt = await tx.wait();

            return {
                success: true,
                transactionHash: tx.hash,
                blockNumber: receipt.blockNumber
            };

        } catch (error: any) {
            if (
                error.reason?.includes("Game already finished") ||
                error.message?.includes("Game already finished")
            ) {
                return {
                    success: true,
                    transactionHash: null,
                    blockNumber: null,
                    message: "Game already finished"
                };
            }
            return {
                success: false,
                transactionHash: null,
                blockNumber: null,
                message: error.message
            };
        }
    }
}
