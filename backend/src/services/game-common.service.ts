import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from '../entities/entities/Games';
import { Repository } from 'typeorm';
import { GamePlayers } from '../entities/entities/GamePlayers';
import { GameData } from '../entities/entities/GameData';
import {IGameData} from "../types/gameData";
import {GameDataDto} from "../dto/gameData.dto";
import {GamePlayerDto} from "../dto/GamePlayer.dto";
import {BlockchainService} from "./blockchain.service";
import {Users} from '../entities/entities/Users';

@Injectable()
export class GameCommonService {
    constructor(
        @InjectRepository(Games)
        private gameRepository: Repository<Games>,
        @InjectRepository(GamePlayers)
        private gamePlayersRepository: Repository<GamePlayers>,
        @InjectRepository(GameData)
        private gameDataRepository: Repository<GameData>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private blockchainService: BlockchainService,

    ) {}

    async getGameData(gameId: number): Promise<IGameData> {
        await this.updatePlayerNumberSet(gameId);

        const gameDataById: any = await this.getGameDataById(gameId.toString());

        let playerData: any = { players: [] };

        if (gameDataById.contractAddress) {
            playerData = await this.blockchainService.getGameData(gameDataById.contractAddress);
        }

        const players = await Promise.all(
            gameDataById.players.map(async (player: GamePlayerDto) => {
                const blockchainPlayer = playerData.players.find((playerBlock: any) => playerBlock.wallet === player.wallet);
                const playerWin = await this.getGamePlayerWin(player.wallet, gameDataById.id);
                const getUserData = await this.getUserData(player.wallet);

                return {
                    wallet: player.wallet,
                    name: getUserData?.login || '',
                    win: playerWin,
                    bet: blockchainPlayer ? blockchainPlayer.isPaid : false,
                    ready: false,
                };
            })
        );

        const gameDataDB = await this.getGameDataById(gameId.toString());

        let gameData: IGameData;
        gameData = {
            gameInfo: {
                id: gameDataById.id,
                type: gameDataById.type,
                bet: gameDataById.bet,
                activePlayersCount: gameDataById.activePlayersCount,
                playersNumber: gameDataById.playersNumber,
                createdAt: gameDataDB.createdAt,
                finishedAt: gameDataDB.finishedAt,
                updatedAt: gameDataDB.updatedAt,
                status: !gameDataById.contractAddress ? 'notStarted'
                    : (!playerData.gameData.isBettingComplete ? 'Waiting payment'
                        : (!gameDataById.finishedAt ? 'Game'
                            : 'Finished')),
            },
            players: players,
        };

        return gameData;
    }

    async updatePlayerNumberSet(gameId: number) {
        const playersCount = await this.gamePlayersRepository.count({
            where: { gameId },
        });

        const game = await this.gameDataRepository.findOne({
            where: { gameId: gameId },
        });
        if (!game) {
            throw new Error('Game not found');
        }

        await this.gameDataRepository.update(
            { gameId },
            { playerNumberSet: playersCount },
        );

        const [gameData] = await Promise.all([
            this.gameDataRepository.findOne({ where: { gameId } }),
            this.gamePlayersRepository.find({ where: { gameId } }),
        ]);
        if (
            gameData &&
            playersCount === game.playersNumber &&
            gameData.playerNumberSet === playersCount
        ) {
        }
    }

    async getGameDataById(gameId: string): Promise<GameDataDto> {
        const game = await this.gameRepository.findOne({
            where: { id: Number(gameId) },
            relations: ['gameData', 'gamePlayers', 'gamePlayers.user', 'gamePlayers.game'],
        });
        if (!game) throw new Error('Game not found');

        return {
            id: game.id,
            type: game.type,
            finishedAt: game.finishedAt,
            createdAt: game.createdAt,
            updatedAt: game.updatedAt,
            bet: game.gameData.bet,
            playersNumber: game.gameData.playersNumber,
            activePlayersCount: game.gameData.playerNumberSet,
            contractAddress: game.contractAddress,
            players: game.gamePlayers
        };
    }

    async getGamePlayerWin(wallet: string, gameId: number) {
        const player = await this.gamePlayersRepository.findOne({
            where: { wallet, gameId },
        });

        return player?.win;
    }

    async getUserData(wallet: string) {
        return await this.usersRepository.findOne({
            where: { wallet: wallet },
        });
    }

}
