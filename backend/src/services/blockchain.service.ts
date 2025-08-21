import DelegateCallGameStorage from '../blockchain/contracts/Game.sol/DelegateCallGameStorage.json';
import {IDataToPay} from "../types/dataToPay";
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import fs from "fs";
import path from "path";
import {IGameDataBlockchain, IPlayerBlockchain} from "../types/blockchain";

@Injectable()
export class BlockchainService {

    private provider = new ethers.JsonRpcProvider('http://localhost:8545');
    private providerToEvents = new ethers.WebSocketProvider('ws://localhost:8545');
    private contract: ethers.Contract | null = null;
    private wallet: ethers.Wallet;
    private readonly logicArtifactPath = path.resolve(
        __dirname,
        '../../../blockchain/artifacts/contracts/GameLogic.sol/GameLogic.json',
    );
    private readonly storageArtifactPath = path.resolve(
        __dirname,
        '../../../blockchain/artifacts/contracts/Game.sol/DelegateCallGameStorage.json',
    );
    constructor(
    ) {
        const privateKey = process.env.OWNER_WALLET;
        this.wallet = new ethers.Wallet(privateKey as string, this.provider);
    }

    async deployGameLogicAddress(logicAddress: any) {
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
        const contract = await DelegateCallGameStorageFactory.deploy(
            players,
            logicAddress,
            time1,
            time2,
        );
        await contract.waitForDeployment();

        return await contract.getAddress();
    }

    contractListener(storageAddress: any) {
        const contract = this.getContract(storageAddress);

        contract.on("LogBet", (wallet, name, bet, event) => {});

        contract.on("BettingFinished", (event) => {});

        contract.on("GameFinalized", (timestamp, event) => {});

        return contract
    }

    async getPlayerData(contractAddress: string) {
        this.contract = new ethers.Contract(contractAddress, DelegateCallGameStorage.abi, this.provider);

        try {
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

            return { gameData, players };
        } catch (error) {
            console.error('Error fetching blockchain data:', error);
            throw error;
        }
    }

    async playerPayment(dataToPay: IDataToPay) {
        try {
            const { wallet, contractAddress, contractBet, privateKey } = dataToPay;

            const playerWallet = new ethers.Wallet(privateKey, this.provider);

            const tx = await playerWallet.sendTransaction({
                to: contractAddress,
                value: contractBet,
            });

            const receipt = await tx.wait();

            const contract = new ethers.Contract(
                contractAddress,
                DelegateCallGameStorage.abi,
                this.providerToEvents
            );

            const players = await contract.getAllPlayers();
            const playerIndex = players.wallets.indexOf(wallet);
            return players.isPaid[playerIndex];
        } catch (error) {
            throw new Error(`Payment error: ${error.message}`);
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
}
