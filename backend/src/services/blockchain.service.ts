import DelegateCallGameStorage from '../blockchain/contracts/Game.sol/DelegateCallGameStorage.json';
import {IDataToPay} from "../types/dataToPay";
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

interface Player {
    name: string;
    wallet: string;
    bet: bigint;
    isPaid: boolean;
    isPaidOut: boolean;
    result: bigint;
}

interface GameData {
    bettingMaxTime: bigint;
    gameMaxTime: bigint;
    createdAt: bigint;
    startedAt: bigint;
    finishedAt: bigint;
    isBettingComplete: boolean;
    isGameAborted: boolean;
    isGameFinished: boolean;
}

@Injectable()
export class BlockchainService {

    private provider = new ethers.JsonRpcProvider('http://localhost:8545');
    private contract: ethers.Contract | null = null;

    async getPlayerData(contractAddress: string) {
        if (!this.contract) {
            this.contract = new ethers.Contract(contractAddress, DelegateCallGameStorage.abi, this.provider);
        }

        try {
            const [
                [bettingMaxTime, gameMaxTime, createdAt, startedAt, finishedAt, isBettingComplete, isGameAborted, isGameFinished],
                [names, wallets, bets, isPaid, isPaidOut, results]
            ] = await Promise.all([
                this.contract['getGameData'](),
                this.contract['getAllPlayers']()
            ]);

            const players: Player[] = names.map((name: string, index: number) => ({
                name,
                wallet: wallets[index],
                bet: bets[index],
                isPaid: isPaid[index],
                isPaidOut: isPaidOut[index],
                result: results[index]
            }));

            const gameData: GameData = {
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
                this.provider
            );

            const players = await contract.getAllPlayers();
            const playerIndex = players.wallets.indexOf(wallet);

            return players.isPaid[playerIndex];
        } catch (error) {
            throw new Error(`Payment error: ${error.message}`);
        }
    }
}
