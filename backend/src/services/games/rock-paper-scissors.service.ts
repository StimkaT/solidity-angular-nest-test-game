import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GameRockPaperScissors} from '../../entities/entities/GameRockPaperScissors';
import {Repository} from 'typeorm';
import {Games} from '../../entities/entities/Games';
import {GamePlayers} from '../../entities/entities/GamePlayers';
import {GameGateway} from '../../game/game-websocket';
import {IRoundResult} from '../../types/rpsGame';
import {BlockchainService} from '../blockchain.service';

@Injectable()
export class RockPaperScissorsService {
    constructor(
        @InjectRepository(GameRockPaperScissors)
        private rpsRepository: Repository<GameRockPaperScissors>,
        @InjectRepository(Games)
        private gameRepository: Repository<Games>,
        @InjectRepository(GamePlayers)
        private gamePlayersRepository: Repository<GamePlayers>,
        private blockchainService: BlockchainService,
        private readonly gameGateway: GameGateway
    ) {
        this.gameGateway._websocketEvents.subscribe(async (data: {event: string, payload: any}) => {
            const gameId = data.payload.gameId;
            const wallet = data.payload.wallet;
            const round = data.payload.round;
            if (data.event === 'set_choice_game') {
                const isConnect = await this.playerIsConnect(gameId, wallet);
                const gameIsStartedButNotFinished = await this.gameIsStartedButNotFinished(gameId);
                if (isConnect.length > 0 && gameIsStartedButNotFinished) {
                    const status = await this.getGameStatus(gameId);
                    if (status === 'Game') {
                        await this.setChoicePlayer(data.payload);
                        await this.sendRpsIntermediateData(gameId);
                        const checkEveryoneBet = await this.checkEveryoneBet(gameId, round);
                        console.log('checkEveryoneBet', checkEveryoneBet)
                        if (checkEveryoneBet) {
                            await this.determiningWinners(gameId, round);
                            await this.sendRpsData(gameId);
                        }
                    }
                }
            }
        })
    }

    // сохраняем выбор игрока
    async setChoicePlayer(data: { gameId: number, choice: string, wallet: string, round: number}) {
        const hasPlayerBet = await this.checkPlayerBet(data.gameId, data.round, data.wallet);

        if (!hasPlayerBet) {
            const playerResult = await this.rpsRepository.findOne({
                where: { gameId: data.gameId, round: data.round, wallets: data.wallet },
            });

            if (playerResult) {
                playerResult.result = data.choice;
                await this.rpsRepository.save(playerResult);
                console.log('Choice updated for player:', data.wallet);
            }
        }
    }

    async sendRpsData(gameId: number) {
        const wallets = await this.gamePlayerList(gameId);
        const roundsData = await this.getRoundsInfo(gameId);
        const activeRound = await this.getCurrentRound(gameId);
        const rpsGameData = {gameId, activeRound, roundsData, wallets}
        this.gameGateway.send('rpsGame_rounds_data', rpsGameData, gameId)
    }

    async sendRpsIntermediateData(gameId: number) {
        const activeRound = await this.getCurrentRound(gameId);
        const roundsData = await this.getRoundsInfo(gameId);
        const wallets = await this.gamePlayerList(gameId);
        const rpsGameData = {gameId, activeRound, roundsData, wallets}
        this.gameGateway.send('rpsGame_intermediate_round_data', rpsGameData, gameId)
    }

    //создаем пустой первый уровень после того как все оплатили - логика нужна для определения статуса на текущий раунд
    // result = null - ждем ставку
    // result = 0 - игрок выбыл на этот и последующие раунды
    // result = >0 - игрок сделал ставку в этом раунде
    async createRoundRockPaperScissors(gameId: number) {
        console.log('createNewWILD')
        const status = await this.getGameStatus(gameId);
        if (status === 'Game') {
            const activeRound = await this.getCurrentRound(gameId);
            const nextRound = activeRound + 1;
            const wallets = await this.gamePlayerList(gameId);
            if (activeRound < 1) {
                for (const wallet of wallets) {
                    const rpsRecord = this.rpsRepository.create({
                        gameId,
                        wallets: wallet,
                        round: nextRound,
                        result: null
                    });
                    await this.rpsRepository.save(rpsRecord);


                    // await this.setChoiceGame(data.payload);
                    // await this.sendRpsData(gameId);
                }
            } else if (activeRound >= 1) {

                //добавить логику отправки результата
                for (const wallet of wallets) {
                    const resultValue = await this.lastRoundResult(wallet, activeRound, gameId);

                    const rpsRecord = this.rpsRepository.create({
                        gameId,
                        wallets: wallet,
                        round: nextRound,
                        result: resultValue
                    });
                    await this.rpsRepository.save(rpsRecord);
                }

            }
        }
    }

    // определение победителей
    async determiningWinners(gameId: number, activeRound: number) {
        const wallets = await this.gamePlayerList(gameId);
        const losersWallets: string[] = [];
        const winnerWallets: string[] = [];
        for (const wallet of wallets) {
            const isLoser = await this.checkTypeWallet(gameId, activeRound, wallet);

            if (isLoser) {
                losersWallets.push(wallet);
            } else {
                winnerWallets.push(wallet);
            }
        }

        console.log('losersWalletsStart', losersWallets)
        console.log('winnerWalletsStart', winnerWallets)

        // получение списка для winnerWallets [кошелек:результат, ...];
        const resultsMap = await this.walletsResultList(gameId, activeRound, winnerWallets);
        // определение кол-во вариаций результатов
        const resultVariations = this.countResultVariations(resultsMap);

        let finalWinners = [...winnerWallets];

        // console.log('resultVariations',resultVariations)
        // Алгоритм определения победителя
        if (resultVariations.variations >= 3 || resultVariations.variations === 1) {
            // const allKeys = walletList.map(item => item.key);
            await this.createRoundRockPaperScissors(gameId); //TODO: ошибка - зацикливание логики
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

                teams[teamName] = teamPlayers.map(player => player.wallets);
                teamResults[`${teamName}Result`] = resultValue;

                console.log(`${teamName} wallets:`, teams[teamName]);
                console.log(`${teamName} result:`, resultValue);
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

            // console.log('losingResponse:', losingResponse);

            const losingWallets: string[] = [];

            for (const [wallet, result] of Object.entries(resultsMap)) {
                if (result === losingResponse) {
                    losingWallets.push(wallet);
                }
            }

            losersWallets.push(...losingWallets);

            finalWinners = finalWinners.filter(wallet => !losingWallets.includes(wallet));

            // Если победителей > 1, создаем новый раунд
            if (finalWinners.length > 1) {
                await this.createRoundRockPaperScissors(gameId);
            } else {
                console.log('popitka finish', gameId, finalWinners[0])
                await this.finishGame(gameId, finalWinners[0])
                console.log('popitka finish2')
            }
        }
        // если никто не победил, то и возвращаем всех winner полным списком
        console.log('losersWalletsFINALY', losersWallets)
        console.log('winnerWalletsFINALY', finalWinners)
        return { losersWallets, winnerWallets };
    }

    async finishGame(gameId: number, wallet: string) {
        console.log('finishTYStart', gameId, wallet, )

        const game = await this.getGameData(gameId);

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
        console.log('finishTY', playerResults)

        return await this.blockchainService.finish({
            contractAddress: game.contractAddress,
            playerResults: playerResults
        });
    }

    // получение списка для winnerWallets [кошелек:результат, ...];
    async walletsResultList(gameId: number, activeRound: number, wallets: string[]) {
        const result: { [key: string]: any } = {};

        for (const wallet of wallets) {
            let rpsResult = await this.rpsRepository.findOne({
                where: { gameId, wallets: wallet, round: activeRound },
            });

            result[wallet] = rpsResult?.result;
        }

        return result;
    }

    // Функция для подсчета вариаций результатов
    private countResultVariations(resultsMap: { [key: string]: any }): {
        variations: number;
        resultCounts: { [result: string]: number };
        uniqueResults: string[];
    } {
        const resultCounts: { [result: string]: number } = {};

        // Подсчет количества каждого результата
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

    //определение кошельков которые проиграли
    async checkTypeWallet(gameId: number, activeRound: number, wallet: string) {
        let rpsRecord = await this.rpsRepository.findOne({
            where: {gameId, wallets: wallet, round: activeRound},
        });

        const result = Number(rpsRecord?.result);
        return result === 0;
    }

    // проверка, что все кошельки поставили
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

    // проверка, что игрок поставил
    async checkPlayerBet(gameId: number, activeRound: number, wallet: string) {
        const playerResult = await this.rpsRepository.findOne({
            where: { gameId, round: activeRound, wallets: wallet },
        });

        return playerResult!.result !== null;
    }


    // Получаем текущий активный раунд
    async getCurrentRound(gameId: number): Promise<number> {
        const lastRecord = await this.rpsRepository.findOne({
            where: { gameId },
            order: { round: 'DESC' },
            select: ['round']
        });
        return lastRecord ? lastRecord.round : 0;
    }

    // проверка подключен ли данный игрок
    async playerIsConnect(gameId: number, wallet: string) {
        return await this.gamePlayersRepository.find({
            where: {gameId, wallet},
        });
    }

    // начата и не закончена ли игра
    async gameIsStartedButNotFinished(gameId: number) {
        const game = await this.getGameData(gameId);
        let result = false;
        const status = await this.getGameStatus(gameId)
        // finishedAt возможно лишнее, но для подстраховки - оставил
        console.log('status', status)
        if (!game?.finishedAt && (status === 'Game')) {
            result = true;
        }

        return result
    }

    async getRoundsInfo(gameId: number): Promise<IRoundResult[]> {
        const rounds = await this.rpsRepository.find({
            where: { gameId },
            order: { round: 'ASC' }
        });

        const game = await this.getGameData(gameId);
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
            const betsWithChoices = roundBets.filter(bet => bet.result !== null && bet.result !== undefined);
            const allPlayersMadeBets = betsWithChoices.length >= playersCount;

            const roundResult: IRoundResult = {
                roundNumber,
                players: roundBets.map(bet => {
                    const playerData: any = {
                        wallet: bet.wallets
                    };

                    if (bet.result === null) {
                        playerData.status = "notBet";
                    } else if (+bet.result === 0) {
                        playerData.status = "loser";
                    } else {
                        playerData.status = "isBet";
                    }

                    if (allPlayersMadeBets && bet.result !== null && bet.result !== undefined) {
                        playerData.choice = bet.result;
                    }

                    return playerData;
                })
            };

            result.push(roundResult);
        }

        return result.sort((a, b) => a.roundNumber - b.roundNumber);
    }

    //кол-во человек в игре
    private async getPlayersCount(gameId: number): Promise<number> {
        if (this.gamePlayersRepository) {
            return await this.gamePlayersRepository.count({
                where: { gameId }
            });
        }
        return 0;
    }

    // получаем все данные об игре
    async getGameData(gameId: number): Promise<Games | null> {
        return await this.gameRepository.findOne({
            where: {id: gameId},
            relations: ['gameRockPaperScissors', 'gamePlayers', 'gameData'],
        });
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

    // Определяем результаты предыдущего раунда и если у кого-то был результат 0 == проигравший
    // то переноси этот результат и в новый раунд - тк. Этот игрок уже исключен и не может ставить
    async lastRoundResult(wallet: string, round: number, gameId: number): Promise<string | null> {
        const roundResult = await this.rpsRepository.findOne({
            where: {wallets: wallet, round, gameId},
        });

        return roundResult?.result === '0' ? '0' : null;
    }

    //получаем статус
    async getGameStatus(gameId: number): Promise<string> {
        const game = await this.getGameData(gameId);

        if (!game || !game.contractAddress) return 'notStarted';

        const blockchainData = await this.blockchainService.getGameData(game.contractAddress);

        return !blockchainData.gameData.isBettingComplete
            ? 'Waiting payment'
            : (game.finishedAt ? 'Finished' : 'Game');
    }

}

