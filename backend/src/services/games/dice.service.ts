import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GameRockPaperScissors} from '../../entities/entities/GameRockPaperScissors';
import {IsNull, Repository} from 'typeorm';
import {Games} from '../../entities/entities/Games';
import {GamePlayers} from '../../entities/entities/GamePlayers';
import {GameGateway} from '../../game/game-websocket';
import {IRoundResult} from '../../types/rpsGame';
import {BlockchainService} from '../blockchain.service';
import {GameCommonService} from '../game-common.service';
import {Users} from '../../entities/entities/Users';
import {GameDice} from '../../entities/entities/GameDice';

@Injectable()
export class DiceService {
    constructor(
        @InjectRepository(GameRockPaperScissors)
        private rpsRepository: Repository<GameRockPaperScissors>,
        @InjectRepository(GameDice)
        private gameDiceRepository: Repository<GameDice>,
        @InjectRepository(Games)
        private gameRepository: Repository<Games>,
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
            // const round = data.payload.round;
            const gameDataById = await this.gameCommonService.getGameDataById(gameId);
            if (data.event === 'make_action' && gameDataById.type === 'dice') {
                const isConnect = await this.gameCommonService.playerIsConnected(gameId, wallet);
                const gameIsStartedButNotFinished = await this.gameCommonService.gameIsStartedButNotFinished(gameId);
                if (isConnect && gameIsStartedButNotFinished) {
            //         await this.setChoicePlayer(data.payload);
            //         const gameData = await this.gameCommonService.getGameData(data.payload.gameId);
            //         await this.sendRpsData('game_data', 'make_action', gameData, data.payload.gameId);
            //         await new Promise(resolve => setTimeout(resolve, 5000));
            //         const lastRound = await this.getLastRoundGame(gameId);
            //         const checkEveryoneBet = await this.checkEveryoneBet(gameId, lastRound);
            //         if (checkEveryoneBet) {
            //             await this.determiningWinners(gameId, lastRound);
            //         }
                }
            }
        })
    }
    // // сохраняем выбор игрока
    // async setChoicePlayer(data: { gameId: number, choice: string, wallet: string, round: number}) {
    //     const playerResult = await this.rpsRepository.findOne({
    //         where: {
    //             gameId: data.gameId,
    //             round: data.round,
    //             wallets: data.wallet
    //         },
    //     });
    //
    //     if (!playerResult || playerResult.result !== null) {
    //         return;
    //     }
    //
    //     playerResult.result = data.choice;
    //     await this.rpsRepository.save(playerResult);
    // }
    //
    async sendRpsData(note: string, sendNote: string, gameData: any, gameId: number) {
        let roundsData = 'await this.getRoundsInfo(gameId)';
        const activeRound = await this.getCurrentRound(gameId);
        const rpsGameData = {sendNote, gameData, activeRound, roundsData}
        this.gameGateway.send(note, rpsGameData, gameId)
    }

    async createRoundDice(gameId: number, losersWallets: string[] = [], finalWinners: string[] = []) {
        const status = await this.gameCommonService.getGameStatus(gameId);
        //
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
                        result: '0'
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
        //
            const gameData = await this.gameCommonService.getGameData(gameId);
            await this.sendRpsData('game_data', 'new_round', gameData, gameId);
        }
    }
    //
    // // определение победителей
    // async determiningWinners(gameId: number, activeRound: number) {
    //     const wallets = await this.gamePlayerList(gameId);
    //     const losersWallets: string[] = [];
    //     const winnerWallets: string[] = [];
    //     for (const wallet of wallets) {
    //         const isLoser = await this.checkLoserWallets(gameId, activeRound, wallet);
    //         if (isLoser) {
    //             losersWallets.push(wallet);
    //         } else {
    //             winnerWallets.push(wallet);
    //         }
    //     }
    //
    //     // получение списка для winnerWallets [кошелек:результат, ...];
    //     const resultsMap = await this.walletsResultList(gameId, activeRound, winnerWallets);
    //     // определение кол-во вариаций результатов
    //     const resultVariations = this.countResultVariations(resultsMap);
    //
    //     let finalWinners = [...winnerWallets];
    //
    //     // Алгоритм определения победителя
    //     const activePlayersCount = await this.getActivePlayersCount(gameId, activeRound);
    //
    //     if ((resultVariations.variations >= 3 || resultVariations.variations === 1) && activePlayersCount === 0) {
    //         // const allKeys = walletList.map(item => item.key);
    //         await this.createRoundRockPaperScissors(gameId, losersWallets, finalWinners);
    //     } else if (resultVariations.variations === 2) {
    //         const teams: { [key: string]: string[] } = {};
    //         const teamResults: { [key: string]: string } = {};
    //
    //         for (let i = 0; i < resultVariations.uniqueResults.length; i++) {
    //             const resultValue = resultVariations.uniqueResults[i];
    //             const teamName = `team${i + 1}`;
    //
    //             const teamPlayers = await this.rpsRepository.find({
    //                 where: {
    //                     gameId,
    //                     round: activeRound,
    //                     result: resultValue
    //                 },
    //             });
    //
    //             teams[teamName] = teamPlayers.map(player => player.wallets);
    //             teamResults[`${teamName}Result`] = resultValue;
    //         }
    //
    //         let losingResponse: string;
    //
    //         const a = teamResults['team1Result'];
    //         const b = teamResults['team2Result'];
    //
    //
    //         if (a === '1' && b === '2') losingResponse = '2';
    //         else if (a === '2' && b === '1') losingResponse = '2';
    //         else if (a === '2' && b === '3') losingResponse = '3';
    //         else if (a === '3' && b === '2') losingResponse = '3';
    //         else if (a === '1' && b === '3') losingResponse = '1';
    //         else if (a === '3' && b === '1') losingResponse = '1';
    //         else losingResponse = '0';
    //
    //         const losingWallets: string[] = [];
    //
    //         for (const [wallet, result] of Object.entries(resultsMap)) {
    //             if (result === losingResponse) {
    //                 losingWallets.push(wallet);
    //             }
    //         }
    //
    //         losersWallets.push(...losingWallets);
    //
    //         finalWinners = finalWinners.filter(wallet => !losingWallets.includes(wallet));
    //         // Если победителей > 1 И есть активные игроки, создаем новый раунд
    //         if (finalWinners.length > 1) {
    //             await this.createRoundRockPaperScissors(gameId, losersWallets, finalWinners);
    //         } else {
    //             const notFinished = await this.getGameStatus(gameId);
    //             if (notFinished !== 'Finished') {
    //                 await this.finishGame(gameId, finalWinners[0])
    //             }
    //         }
    //     }
    //     return { losersWallets, winnerWallets };
    // }
    //
    // async getActivePlayersCount(gameId: number, activeRound: number) {
    //     return await this.rpsRepository.count({
    //         where: {
    //             gameId,
    //             round: activeRound,
    //             result: IsNull()
    //         }
    //     });
    // }
    //
    //
    //
    // async finishGame(gameId: number, wallet: string) {
    //     const game = await this.getGameData(gameId);
    //
    //     // Проверяем, что game не null
    //     if (!game) {
    //         throw new Error(`Game with id ${gameId} not found`);
    //     }
    //
    //     // Проверяем, что contractAddress не null
    //     if (!game.contractAddress) {
    //         throw new Error(`Contract address for game ${gameId} is not set`);
    //     }
    //
    //     const playerResults = [
    //         {
    //             wallet: wallet,
    //             percent: 100
    //         }
    //     ];
    //
    //     return await this.blockchainService.finish({
    //         contractAddress: game.contractAddress,
    //         playerResults: playerResults
    //     });
    // }
    //
    // // получение списка для winnerWallets [кошелек:результат, ...];
    // async walletsResultList(gameId: number, activeRound: number, wallets: string[]) {
    //     const result: { [key: string]: any } = {};
    //
    //     for (const wallet of wallets) {
    //         let rpsResult = await this.rpsRepository.findOne({
    //             where: { gameId, wallets: wallet, round: activeRound },
    //         });
    //
    //         result[wallet] = rpsResult?.result;
    //     }
    //
    //     return result;
    // }
    //
    // // Функция для подсчета вариаций результатов
    // private countResultVariations(resultsMap: { [key: string]: any }): {
    //     variations: number;
    //     resultCounts: { [result: string]: number };
    //     uniqueResults: string[];
    // } {
    //     const resultCounts: { [result: string]: number } = {};
    //
    //     // Подсчет количества каждого результата
    //     for (const wallet in resultsMap) {
    //         const result = resultsMap[wallet] || 'unknown';
    //         resultCounts[result] = (resultCounts[result] || 0) + 1;
    //     }
    //
    //     const uniqueResults = Object.keys(resultCounts);
    //
    //     return {
    //         variations: uniqueResults.length,
    //         resultCounts,
    //         uniqueResults
    //     };
    // }
    //
    // //определение кошельков которые проиграли
    // async checkLoserWallets(gameId: number, activeRound: number, wallet: string) {
    //     let rpsRecord = await this.rpsRepository.findOne({
    //         where: {gameId, wallets: wallet, round: activeRound},
    //     });
    //
    //     const result = Number(rpsRecord?.result);
    //     return result === 0;
    // }
    //
    // // проверка, что все кошельки поставили
    // async checkEveryoneBet(gameId: number, activeRound: number) {
    //     const rpsRecords = await this.rpsRepository.find({
    //         where: { gameId, round: activeRound },
    //     });
    //
    //     if (rpsRecords.length === 0) {
    //         return false;
    //     }
    //
    //     for (const record of rpsRecords) {
    //         if (record.result === null || record.result === undefined || isNaN(Number(record.result))) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // }
    //
    // // Получаем текущий активный раунд
    async getCurrentRound(gameId: number): Promise<number> {
        const lastRecord = await this.gameDiceRepository.findOne({
            where: { gameId },
            order: { round: 'DESC' },
            select: ['round']
        });
        return lastRecord ? lastRecord.round : 0;
    }
    //
    // async getRoundsInfo(gameId: number): Promise<IRoundResult[]> {
    //     const rounds = await this.rpsRepository.find({
    //         where: { gameId },
    //         order: { round: 'ASC' }
    //     });
    //
    //     const game = await this.getGameData(gameId);
    //     if (!game) {
    //         return [];
    //     }
    //
    //     const playersCount = await this.getPlayersCount(gameId);
    //     const result: IRoundResult[] = [];
    //
    //     const roundsMap = new Map<number, any[]>();
    //
    //     for (const round of rounds) {
    //         if (round.round === null) {
    //             continue;
    //         }
    //
    //         if (!roundsMap.has(round.round)) {
    //             roundsMap.set(round.round, []);
    //         }
    //         roundsMap.get(round.round)!.push(round);
    //     }
    //
    //     for (const [roundNumber, roundBets] of roundsMap.entries()) {
    //         const betsWithChoices = roundBets.filter(bet => bet.result != null);
    //         const allPlayersMadeBets = betsWithChoices.length >= playersCount;
    //
    //         const players = await Promise.all(
    //             roundBets.map(async (bet) => {
    //                 const user = await this.getUserData(bet.wallets);
    //                 const playerData: any = {
    //                     wallet: bet.wallets,
    //                     name: user?.login || '',
    //                     isPlaying: bet.result !== 0,
    //                     hasActed: bet.result != null,
    //                     result: ''
    //                 };
    //
    //                 if (allPlayersMadeBets && bet.result != null) {
    //                     playerData.result = bet.result;
    //                 }
    //
    //                 return playerData;
    //             })
    //         );
    //
    //         result.push({ roundNumber, players });
    //     }
    //
    //     return result.sort((a, b) => a.roundNumber - b.roundNumber);
    // }
    //
    // async getUserData(wallet: string) {
    //     return await this.usersRepository.findOne({
    //         where: { wallet },
    //     });
    // }
    //
    // //кол-во человек в игре
    // private async getPlayersCount(gameId: number): Promise<number> {
    //     if (this.gamePlayersRepository) {
    //         return await this.gamePlayersRepository.count({
    //             where: { gameId }
    //         });
    //     }
    //     return 0;
    // }
    //
    //
    //
    // Определяем результаты предыдущего раунда и если у кого-то был результат 0 == проигравший
    // то переноси этот результат и в новый раунд - тк. Этот игрок уже исключен и не может ставить
    async lastRoundResult(wallet: string, round: number, gameId: number): Promise<string | null> {
        const roundResult = await this.gameDiceRepository.findOne({
            where: {wallet: wallet, round, gameId},
        });

        return roundResult?.result === '0' ? '0' : null;
    }
    //
    // async getLastRoundGame(gameId: number) {
    //     const lastRound = await this.rpsRepository.findOne({
    //         where: { gameId },
    //         order: { round: 'DESC' }, // Сортируем по убыванию
    //         select: ['round'] // Выбираем только поле round
    //     });
    //
    //     return lastRound ? lastRound.round : 0;
    // }

}

