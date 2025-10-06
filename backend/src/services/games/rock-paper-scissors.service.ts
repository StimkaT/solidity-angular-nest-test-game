import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GameRockPaperScissors} from '../../entities/entities/GameRockPaperScissors';
import {IsNull, Repository} from 'typeorm';
import {GamePlayers} from '../../entities/entities/GamePlayers';
import {GameGateway} from '../../game/game-websocket';
import {IRoundResult} from '../../types/rpsGame';
import {BlockchainService} from '../blockchain.service';
import {GameCommonService} from '../game-common.service';
import {Users} from '../../entities/entities/Users';

@Injectable()
export class RockPaperScissorsService {
    constructor(
        @InjectRepository(GameRockPaperScissors)
        private rpsRepository: Repository<GameRockPaperScissors>,
        @InjectRepository(GamePlayers)
        private gamePlayersRepository: Repository<GamePlayers>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private blockchainService: BlockchainService,
        private gameCommonService: GameCommonService,
        private readonly gameGateway: GameGateway
    ) {
        this.gameGateway._websocketEvents.subscribe(async (data: {event: string, payload: any}) => {
            const gameId = data.payload.gameId;
            const wallet = data.payload.wallet;
            const gameDataById = await this.gameCommonService.getGameDataById(gameId);
            if (data.event === 'make_action' && gameDataById.type === 'rock-paper-scissors') {
                const isConnect = await this.gameCommonService.playerIsConnected(gameId, wallet);
                const gameIsStartedButNotFinished = await this.gameCommonService.gameIsStartedButNotFinished(gameId);
                const gameData = await this.gameCommonService.getGameData(gameId);
                if (isConnect && gameIsStartedButNotFinished) {
                    await this.setChoicePlayer(data.payload);
                    await this.sendRpsData('game_data', 'make_action', gameData, gameId);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    const lastRound = await this.getLastRoundGame(gameId);
                    const checkEveryoneBet = await this.checkEveryoneBet(gameId, lastRound);
                    if (checkEveryoneBet) {
                        await this.determiningWinners(gameId, lastRound);
                    }
                }

            }
        })
    }

    async setChoicePlayer(data: { gameId: number, data: any, wallet: string, round: number}) {
        const playerResult = await this.rpsRepository.findOne({
            where: {
                gameId: data.gameId,
                round: data.round,
                wallet: data.wallet
            },
        });

        if (!playerResult || playerResult.result !== null) {
            return;
        }

        playerResult.result = data.data;
        await this.rpsRepository.save(playerResult);
    }

    async sendRpsData(note: string, sendNote: string, gameData: any, gameId: number) {
        let roundsData = await this.getRoundsInfo(gameId);
        const activeRound = await this.getCurrentRound(gameId);
        const rpsGameData = {sendNote, gameData, activeRound, roundsData}
        this.gameGateway.send(note, rpsGameData, gameId)
    }

    async createRoundRockPaperScissors(gameId: number, losersWallets: string[] = [], finalWinners: string[] = []) {
        const status = await this.gameCommonService.getGameStatus(gameId);

        if (status === 'Game') {
            const activeRound = await this.getCurrentRound(gameId);
            const nextRound = activeRound + 1;
            const wallets = await this.gamePlayerList(gameId);

            if (activeRound < 1) {
                for (const wallet of wallets) {
                    const rpsRecord = this.rpsRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: null
                    });
                    await this.rpsRepository.save(rpsRecord);
                }
            } else if (activeRound >= 1 && losersWallets.length > 0) {

                for (const wallet of losersWallets) {
                    const rpsRecord = this.rpsRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: '0'
                    });
                    await this.rpsRepository.save(rpsRecord);
                }

                for (const wallet of finalWinners) {
                    const rpsRecord = this.rpsRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: null
                    });
                    await this.rpsRepository.save(rpsRecord);
                }

            }
            else if (activeRound >= 1) {
                for (const wallet of wallets) {
                    const resultValue = await this.lastRoundResult(wallet, activeRound, gameId);

                    const rpsRecord = this.rpsRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: resultValue
                    });
                    await this.rpsRepository.save(rpsRecord);
                }
            }

            if (wallets.length > 0) {
                const botsAll = await this.usersRepository.find({
                    where: { status: 'bot' },
                });

                const walletsBots = botsAll.map(bot => bot.wallet);

                const botsSet = new Set(walletsBots);

                const filteredWallets = wallets.filter(wallet => !losersWallets.includes(wallet));

                const allWalletsAreBots = filteredWallets.every(wallet =>
                    botsSet.has(wallet)
                );

                for (const wallet of filteredWallets) {
                    if (botsSet.has(wallet)) {
                        const valueBot = this.getRandomForBot();
                        const data = { gameId, data: valueBot, wallet, round: nextRound };
                        await this.setChoicePlayer(data);

                        if (allWalletsAreBots) {
                            const lastRound = await this.getLastRoundGame(gameId);
                            const checkEveryoneBet = await this.checkEveryoneBet(gameId, lastRound);
                            if (checkEveryoneBet) {
                                await this.determiningWinners(gameId, lastRound);
                            }
                        }
                    }
                }
            }
            const gameData = await this.gameCommonService.getGameData(gameId);
            await this.sendRpsData('game_data', 'new_round', gameData, gameId);
        }
    }

    getRandomForBot() {
        return Math.floor(Math.random() * 3) + 1;
    }

    async determiningWinners(gameId: number, activeRound: number) {
        const wallets = await this.gamePlayerList(gameId);
        const losersWallets: string[] = [];
        const winnerWallets: string[] = [];
        for (const wallet of wallets) {
            const isLoser = await this.checkLoserWallets(gameId, activeRound, wallet);
            if (isLoser) {
                losersWallets.push(wallet);
            } else {
                winnerWallets.push(wallet);
            }
        }

        const resultsObject = await this.walletsResultList(gameId, activeRound, winnerWallets);
        const resultVariations = this.countResultVariations(resultsObject);

        let finalWinners = [...winnerWallets];

        const activePlayersCount = await this.getActivePlayersCount(gameId, activeRound);

        if ((resultVariations.variations >= 3 || resultVariations.variations === 1) && activePlayersCount === 0) {
            // const allKeys = walletList.map(item => item.key);
            await this.createRoundRockPaperScissors(gameId, losersWallets, finalWinners);
        } else if (resultVariations.variations === 2) {
            const teams: { [key: string]: string[] } = {};
            const teamResults: { [key: string]: string } = {};

            for (let i = 0; i < resultVariations.uniqueResults.length; i++) {
                const resultValue = resultVariations.uniqueResults[i];
                const teamName = `team${i + 1}`;

                const teamPlayers = await this.rpsRepository.find({
                    where: {
                        gameId,
                        round: activeRound,
                        result: resultValue
                    },
                });

                teams[teamName] = teamPlayers.map(player => player.wallet);
                teamResults[`${teamName}Result`] = resultValue;
            }

            let losingResponse: string;

            const a = teamResults['team1Result'];
            const b = teamResults['team2Result'];


            if (a === '1' && b === '2') losingResponse = '2';
            else if (a === '2' && b === '1') losingResponse = '2';
            else if (a === '2' && b === '3') losingResponse = '3';
            else if (a === '3' && b === '2') losingResponse = '3';
            else if (a === '1' && b === '3') losingResponse = '1';
            else if (a === '3' && b === '1') losingResponse = '1';
            else losingResponse = '0';

            const losingWallets: string[] = [];

            for (const [wallet, result] of Object.entries(resultsObject)) {
                if (result === losingResponse) {
                    losingWallets.push(wallet);
                }
            }

            losersWallets.push(...losingWallets);

            finalWinners = finalWinners.filter(wallet => !losingWallets.includes(wallet));
            if (finalWinners.length > 1) {
                await this.createRoundRockPaperScissors(gameId, losersWallets, finalWinners);
            } else {
                const notFinished = await this.gameCommonService.getGameStatus(gameId);
                if (notFinished !== 'Finished') {


                    const gameData = await this.gameCommonService.getGameData(gameId);
                    await this.sendRpsData('game_data', 'new_round', gameData, gameId);

                    await this.finishGame(gameId, finalWinners[0])
                }
            }
        }
        return { losersWallets, winnerWallets };
    }

    async getActivePlayersCount(gameId: number, activeRound: number) {
        return await this.rpsRepository.count({
            where: {
                gameId,
                round: activeRound,
                result: IsNull()
            }
        });
    }



    async finishGame(gameId: number, wallet: string) {
        const game = await this.gameCommonService.getGameDataById(gameId);

        if (!game) {
            throw new Error(`Game with id ${gameId} not found`);
        }

        if (!game.contractAddress) {
            throw new Error(`Contract address for game ${gameId} is not set`);
        }

        const playerResults = [
            {
                wallet: wallet,
                percent: 100
            }
        ];


        const gameData = await this.gameCommonService.getGameData(gameId);
        await this.sendRpsData('game_data', 'finish_game_data', gameData, gameId);

        return await this.blockchainService.finish({
            contractAddress: game.contractAddress,
            playerResults: playerResults
        });
    }

    async walletsResultList(gameId: number, activeRound: number, wallets: string[]) {
        const result: { [key: string]: any } = {};

        for (const wallet of wallets) {
            let resultGame = await this.rpsRepository.findOne({
                where: { gameId, wallet, round: activeRound },
            });

            result[wallet] = resultGame?.result;
        }

        return result;
    }

    private countResultVariations(resultsMap: { [key: string]: any }): {
        variations: number;
        resultCounts: { [result: string]: number };
        uniqueResults: string[];
    } {
        const resultCounts: { [result: string]: number } = {};

        for (const wallet in resultsMap) {
            const result = resultsMap[wallet] || 'unknown';
            resultCounts[result] = (resultCounts[result] || 0) + 1;
        }

        const uniqueResults = Object.keys(resultCounts);

        return {
            variations: uniqueResults.length,
            resultCounts,
            uniqueResults
        };
    }

    async checkLoserWallets(gameId: number, activeRound: number, wallet: string) {
        let rpsRecord = await this.rpsRepository.findOne({
            where: {gameId, wallet, round: activeRound},
        });

        const result = Number(rpsRecord?.result);
        return result === 0;
    }

    async checkEveryoneBet(gameId: number, activeRound: number) {
        const rpsRecords = await this.rpsRepository.find({
            where: { gameId, round: activeRound },
        });

        if (rpsRecords.length === 0) {
            return false;
        }

        for (const record of rpsRecords) {
            if (record.result === null || record.result === undefined || isNaN(Number(record.result))) {
                return false;
            }
        }

        return true;
    }

    async getCurrentRound(gameId: number): Promise<number> {
        const lastRecord = await this.rpsRepository.findOne({
            where: { gameId },
            order: { round: 'DESC' },
            select: ['round']
        });
        return lastRecord ? lastRecord.round : 0;
    }

    async getRoundsInfo(gameId: number): Promise<IRoundResult[]> {
        const rounds = await this.rpsRepository.find({
            where: { gameId },
            order: { round: 'ASC' }
        });
        return this.gameCommonService.getRoundsInfo(gameId, rounds)
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

    async lastRoundResult(wallet: string, round: number, gameId: number): Promise<string | null> {
        const roundResult = await this.rpsRepository.findOne({
            where: {wallet, round, gameId},
        });

        return roundResult?.result === '0' ? '0' : null;
    }

    async getLastRoundGame(gameId: number) {
        const lastRound = await this.rpsRepository.findOne({
            where: { gameId },
            order: { round: 'DESC' },
            select: ['round']
        });

        return lastRound ? lastRound.round : 0;
    }
}

