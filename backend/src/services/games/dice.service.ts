import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {GameGateway} from '../../game/game-websocket';
import {IRoundResult} from '../../types/rpsGame';
import {GameCommonService} from '../game-common.service';
import {GameDice} from '../../entities/entities/GameDice';
import {Users} from '../../entities/entities/Users';

@Injectable()
export class DiceService {
    private sendSequenceByGame = new Map<number, number>();
    constructor(
        @InjectRepository(GameDice)
        private gameDiceRepository: Repository<GameDice>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private gameCommonService: GameCommonService,
        private readonly gameGateway: GameGateway,
    ) {
        this.gameGateway._websocketEvents.subscribe((data) => {
            if (data.event === 'make_action') {
                this.handleMakeAction(data).catch(err => {
                    console.error('Error in handleMakeAction:', err);
                });
            }
        });
    }

    private async isBotWallet(wallet: string): Promise<boolean> {
        const bot = await this.usersRepository.findOne({ where: { status: 'bot', wallet } });
        return !!bot;
    }

    async playBotsIfActive(gameId: number, round: number) {
        for (let i = 0; i < 20; i++) {
            const generateCounts = this.getRandomNumbers(1, 6, 2);
            const activePlayer = await this.gameCommonService.setOrderOfThrows(gameId, round);

            if (!activePlayer) {

                const gameDataNow = await this.gameCommonService.getGameData(gameId);
                const dataSend = {activeWallet: activePlayer, diceCounts: null};
                await this.sendDiceData('game_data', 'make_action', gameDataNow, gameId, dataSend);

                break;
            }

            const isBot = await this.isBotWallet(activePlayer);
            if (!isBot) {
                break;
            } else {
                const gameDataNow = await this.gameCommonService.getGameData(gameId);
                const dataSend = {activeWallet: activePlayer, diceCounts: generateCounts};
                await this.sendDiceData('game_data', 'make_action', gameDataNow, gameId, dataSend);
            }

            await this.delay(3000);

            await this.setCountPlayer({ gameId, wallet: activePlayer, round }, generateCounts);
            const gameDataNow = await this.gameCommonService.getGameData(gameId);
            const activePlayerNext = await this.gameCommonService.setOrderOfThrows(gameId, round);
            const dataSend = {activeWallet: activePlayerNext, diceCounts: generateCounts};

            await this.sendDiceData('game_data', 'make_action', gameDataNow, gameId, dataSend);

            await this.delay(2000);

            const lastRound = await this.getLastRoundGame(gameId);
            const everyoneBet = await this.checkEveryoneBet(gameId, lastRound);
            if (everyoneBet) {
                await this.determiningWinners(gameId, lastRound);
                break;
            }
        }
    }

    private async handleMakeAction(data: { event: string; payload: any }) {
        const { gameId, wallet } = data.payload;
        const gameDataById = await this.gameCommonService.getGameDataById(gameId);

        if (gameDataById.type !== 'dice') return;

        const [isConnect, gameIsStartedButNotFinished] = await Promise.all([
            this.gameCommonService.playerIsConnected(gameId, wallet),
            this.gameCommonService.gameIsStartedButNotFinished(gameId),
        ]);

        if (!(isConnect && gameIsStartedButNotFinished)) return;

        const generateCounts = this.getRandomNumbers(1, 6, 2);
        const gameData = await this.gameCommonService.getGameData(gameId);

        await this.processDiceAction(gameData, data.payload, generateCounts);
    }

    private async processDiceAction(
        gameData: any,
        payload: any,
        generateCounts: number[],
    ) {
        const { gameId, round } = payload;

        const orderOfThrows = await this.gameCommonService.setOrderOfThrows(gameId, round);
        const dataSend = {activeWallet: orderOfThrows, diceCounts: generateCounts};
        await this.sendDiceData('game_data', 'make_action', gameData, gameId, dataSend);

        await this.delay(3000);
        await this.setCountPlayer(payload, generateCounts);

        const orderOfThrowsAfter = await this.gameCommonService.setOrderOfThrows(gameId, round);
        const dataSendAfter = {activeWallet: orderOfThrowsAfter, diceCounts: generateCounts};
        await this.sendDiceData('game_data', 'make_action', gameData, gameId, dataSendAfter);

        await this.playBotsIfActive(gameId, round);

        await this.delay(5000);
        const lastRound = await this.getLastRoundGame(gameId);
        const checkEveryoneBet = await this.checkEveryoneBet(gameId, lastRound);

        if (checkEveryoneBet) {
            await this.determiningWinners(gameId, lastRound);
        }
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async setCountPlayer(data: { gameId: number, wallet: string, round: number}, counts: number[]) {
        const sumCounts = counts[0] + counts[1];
        const playerResult = await this.gameDiceRepository.findOne({
            where: {
                gameId: data.gameId,
                round: data.round,
                wallet: data.wallet
            },
        });

        if (!playerResult || playerResult.result !== null) {
            return;
        }

        playerResult.result = sumCounts;
        await this.gameDiceRepository.save(playerResult);
    }

    async sendDiceData(note: string, sendNote: string, gameData: any, gameId: number, orderOfThrows: any) {
        const activeRound = await this.getCurrentRound(gameId);
        let roundsData = await this.getRoundsInfo(gameId);
        if (!orderOfThrows) {
            orderOfThrows = {};
        }
        if (orderOfThrows && !orderOfThrows.activeWallet) {
            const round = await this.getCurrentRound(gameId);
            orderOfThrows.activeWallet = await this.gameCommonService.setOrderOfThrows(gameId, round);
        }

        const seq = (this.sendSequenceByGame.get(gameId) || 0) + 1;
        this.sendSequenceByGame.set(gameId, seq);
        const processedOrderOfThrows = {
            activeWallet: orderOfThrows.activeWallet,
            diceCounts: orderOfThrows.diceCounts
        };

        const rpsGameData = {sendNote, gameData, activeRound, roundsData, orderOfThrows: processedOrderOfThrows}
        this.gameGateway.send(note, rpsGameData, gameId)
    }

    async createRoundDice(gameId: number, losersWallets: string[] = [], finalWinners: string[] = []) {
        const status = await this.gameCommonService.getGameStatus(gameId);
        if (status === 'Game') {
            const activeRound = await this.getCurrentRound(gameId);
            const nextRound = activeRound + 1;
            const wallets = await this.gameCommonService.gamePlayerList(gameId);

            if (activeRound < 1) {
                for (const wallet of wallets) {
                    const rpsRecord = this.gameDiceRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: null
                    });
                    await this.gameDiceRepository.save(rpsRecord);
                }
            } else if (activeRound >= 1 && losersWallets.length > 0) {

                for (const wallet of losersWallets) {
                    const rpsRecord = this.gameDiceRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: 0
                    });
                    await this.gameDiceRepository.save(rpsRecord);
                }

                for (const wallet of finalWinners) {
                    const rpsRecord = this.gameDiceRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: null
                    });
                    await this.gameDiceRepository.save(rpsRecord);
                }

            } else if (activeRound >= 1) {
                for (const wallet of wallets) {
                    const resultValue = await this.lastRoundResult(wallet, activeRound, gameId);

                    const rpsRecord = this.gameDiceRepository.create({
                        gameId,
                        wallet,
                        round: nextRound,
                        result: resultValue
                    });
                    await this.gameDiceRepository.save(rpsRecord);
                }
            }

            const orderOfThrows = await this.gameCommonService.setOrderOfThrows(gameId, nextRound);
            const gameData = await this.gameCommonService.getGameData(gameId);
            const dataSend = {activeWallet: orderOfThrows, diceCounts: null};
            await this.sendDiceData('game_data', 'new_round', gameData, gameId, dataSend);
            await this.playBotsIfActive(gameId, nextRound);
        }
    }

    async determiningWinners(gameId: number, activeRound: number) {
        const wallets = await this.gameCommonService.gamePlayerList(gameId);
        const initialLosers: string[] = [];
        const potentialWinners: string[] = [];

        for (const wallet of wallets) {
            const isLoser = await this.checkLoserWallets(gameId, activeRound, wallet);
            if (isLoser) {
                initialLosers.push(wallet);
            } else {
                potentialWinners.push(wallet);
            }
        }

        const results = await this.walletsResultList(gameId, activeRound, potentialWinners);
        const resultsArray = potentialWinners.map(wallet => results[wallet] || 0);
        const maxResult = Math.max(...resultsArray);

        const winners = potentialWinners.filter(wallet => (results[wallet] || 0) === maxResult);
        const additionalLosers = potentialWinners.filter(wallet => (results[wallet] || 0) !== maxResult);
        const losersWallets = [...initialLosers, ...additionalLosers]

        if (winners.length > 1) {
            await this.createRoundDice(gameId, losersWallets, winners);
        } else if (winners.length === 1) {

            const gameDataNow = await this.gameCommonService.getGameData(gameId);
            const activePlayerNext = await this.gameCommonService.setOrderOfThrows(gameId, activeRound);
            const dataSend = {activeWallet: activePlayerNext, diceCounts: {}};
            await this.sendDiceData('game_data', 'finish_game_data', gameDataNow, gameId, dataSend);

            await this.gameCommonService.finishGame(gameId, winners[0])
        }

        return {
            losersWallets: [...initialLosers, ...additionalLosers],
            winnerWallets: winners
        };
    }

    async walletsResultList(gameId: number, activeRound: number, wallets: string[]) {
        const result: { [key: string]: any } = {};

        for (const wallet of wallets) {
            let resultGame = await this.gameDiceRepository.findOne({
                where: { gameId, wallet: wallet, round: activeRound },
            });

            result[wallet] = resultGame?.result;
        }

        return result;
    }

    async checkLoserWallets(gameId: number, activeRound: number, wallet: string) {
        let rpsRecord = await this.gameDiceRepository.findOne({
            where: {gameId, wallet: wallet, round: activeRound},
        });

        const result = Number(rpsRecord?.result);
        return result === 0;
    }

    async getCurrentRound(gameId: number): Promise<number> {
        const lastRecord = await this.gameDiceRepository.findOne({
            where: { gameId },
            order: { round: 'DESC' },
            select: ['round']
        });
        return lastRecord ? lastRecord.round : 0;
    }

    async getRoundsInfo(gameId: number): Promise<IRoundResult[]> {
        const rounds = await this.gameDiceRepository.find({
            where: { gameId },
            order: { round: 'ASC' }
        });
        return this.gameCommonService.getRoundsInfoAlwaysWithResult(gameId, rounds)
    }

    async lastRoundResult(wallet: string, round: number, gameId: number) {
        const roundResult = await this.gameDiceRepository.findOne({
            where: {wallet: wallet, round, gameId},
        });

        return roundResult?.result === 0 ? 0 : null;
    }

    async getLastRoundGame(gameId: number) {
        const lastRound = await this.gameDiceRepository.findOne({
            where: { gameId },
            order: { round: 'DESC' },
            select: ['round']
        });

        return lastRound ? lastRound.round : 0;
    }

    async checkEveryoneBet(gameId: number, activeRound: number) {
        const gameRecords = await this.gameDiceRepository.find({
            where: { gameId, round: activeRound },
        });

        if (gameRecords.length === 0) {
            return false;
        }
        for (const record of gameRecords) {
            if (record.result === null || record.result === undefined || isNaN(Number(record.result))) {
                return false;
            }
        }

        return true;
    }

    getRandomNumbers(a: number, b: number, count: number): number[] {
        if (a > b) {
            throw new Error('Invalid range: a must be <= b');
        }
        if (count <= 0) {
            throw new Error('Count must be > 0');
        }

        const numbers: number[] = [];
        for (let i = 0; i < count; i++) {
            const random = Math.floor(Math.random() * (b - a + 1)) + a;
            numbers.push(random);
        }
        return numbers;
    }

}

