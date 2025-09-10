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
import {IRoundResult} from '../types/rpsGame';

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

        const gameDataById: any = await this.getGameDataById(gameId);

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

        const gameDataDB = await this.getGameDataById(gameId);

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

    async getGameDataById(gameId: number): Promise<GameDataDto> {
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

    async playerIsConnected(gameId: number, wallet: string): Promise<boolean> {
        const playerConnection = await this.gamePlayersRepository.find({
            where: { gameId, wallet },
        });

        return playerConnection.length > 0;
    }

    // // получаем все данные об игре
    // async getGameDataById(gameId: number): Promise<Games | null> {
    //     return await this.gameRepository.findOne({
    //         where: {id: gameId},
    //         relations: ['gameRockPaperScissors', 'gamePlayers', 'gameData'],
    //     });
    // }

    //получаем статус
    async getGameStatus(gameId: number): Promise<string> {
        const game = await this.getGameDataById(gameId);

        if (!game || !game.contractAddress) return 'notStarted';

        const blockchainData = await this.blockchainService.getGameData(game.contractAddress);

        return !blockchainData.gameData.isBettingComplete
            ? 'Waiting payment'
            : (game.finishedAt ? 'Finished' : 'Game');
    }

    async gameIsStartedButNotFinished(gameId: number): Promise<boolean> {
        const status = await this.getGameStatus(gameId);
        return status === 'Game';
    }


    async getGamePlayersData(gameId: number): Promise<GamePlayers[]> {
        return await this.gamePlayersRepository.find({
            where: {gameId: gameId},
        });
    }


    async gamePlayerList(gameId: number): Promise<string[]> {
        const gamePlayers = await this.getGamePlayersData(gameId);

        return gamePlayers.map(player => {
            return player.wallet;
        });
    }

    //кол-во человек в игре
    async getPlayersCount(gameId: number): Promise<number> {
        if (this.gamePlayersRepository) {
            return await this.gamePlayersRepository.count({
                where: { gameId }
            });
        }
        return 0;
    }

    async getRoundsInfo(gameId: number, rounds: any): Promise<IRoundResult[]> {
        const game = await this.getGameDataById(gameId);
        if (!game) {
            return [];
        }

        const playersCount = await this.getPlayersCount(gameId);
        const result: IRoundResult[] = [];

        const roundsMap = new Map<number, any[]>();

        for (const round of rounds) {
            if (round.round === null) {
                continue;
            }

            if (!roundsMap.has(round.round)) {
                roundsMap.set(round.round, []);
            }
            roundsMap.get(round.round)!.push(round);
        }

        for (const [roundNumber, roundBets] of roundsMap.entries()) {
            const betsWithChoices = roundBets.filter(bet => bet.result != null);
            const allPlayersMadeBets = betsWithChoices.length >= playersCount;

            const players = await Promise.all(
                roundBets.map(async (bet) => {
                    const user = await this.getUserData(bet.wallets);
                    const playerData: any = {
                        wallet: bet.wallets,
                        name: user?.login || '',
                        isPlaying: bet.result !== 0,
                        hasActed: bet.result != null,
                        result: ''
                    };

                    if (allPlayersMadeBets && bet.result != null) {
                        playerData.result = bet.result;
                    }

                    return playerData;
                })
            );

            result.push({ roundNumber, players });
        }

        return result.sort((a, b) => a.roundNumber - b.roundNumber);
    }

    async finishGame(gameId: number, wallet: string) {
        const game = await this.getGameDataById(gameId);

        // Проверяем, что game не null
        if (!game) {
            throw new Error(`Game with id ${gameId} not found`);
        }

        // Проверяем, что contractAddress не null
        if (!game.contractAddress) {
            throw new Error(`Contract address for game ${gameId} is not set`);
        }

        const playerResults = [
            {
                wallet: wallet,
                percent: 100
            }
        ];

        return await this.blockchainService.finish({
            contractAddress: game.contractAddress,
            playerResults: playerResults
        });
    }

}
