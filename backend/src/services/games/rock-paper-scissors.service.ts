import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GameRockPaperScissors} from '../../entities/entities/GameRockPaperScissors';
import {Repository} from 'typeorm';
import {Games} from '../../entities/entities/Games';
import {GamePlayers} from '../../entities/entities/GamePlayers';
import {GameGateway} from '../../game/game-websocket';
import {GameService} from '../game.service';
import {IRoundResult} from '../../types/gameData';

@Injectable()
export class RockPaperScissorsService {

    constructor(
        private gameService: GameService,
        @InjectRepository(GameRockPaperScissors)
        private rpsRepository: Repository<GameRockPaperScissors>,
        @InjectRepository(Games)
        private gameRepository: Repository<Games>,
        @InjectRepository(GamePlayers)
        private gamePlayersRepository: Repository<GamePlayers>,
        private readonly gameGateway: GameGateway

    ) {
        this.gameGateway._websocketEvents.subscribe(async (data: {event: string, payload: any}) => {
            if (data.event === 'set_choice_game') {
                const isConnect = await this.playerIsConnect(data.payload.gameId, data.payload.wallet)
                const gameIsStarted = await this.playerIsConnect(data.payload.gameId, data.payload.wallet)
                if (isConnect.length > 0) {
                    console.log('ne null')
                    await this.setChoiceGame(data.payload);
                    const gameData = await gameService.getGameData(data.payload.gameId);
                    this.gameGateway.send('game_data', gameData, data.payload.gameId)
                }
            }
        })
    }
    // const gameRounds = await this.getRoundsInfo(gameId);
    // gameRounds: gameRounds,
    // gameRounds: IRoundResult[];


// проверка есть подключен ли данный игрок
    async playerIsConnect(gameId: number, wallet: string) {
        return await this.gamePlayersRepository.find({
            where: {gameId, wallet},
        });
    }

// Устанавливаем номер раунда setChoiceGame, createNewRound, isRoundFinished
    async setChoiceGame(data: any) {
        const {gameId, choice, wallet} = data;

        let rpsRecord = await this.rpsRepository.findOne({
            where: {gameId, wallets: wallet},
        });

        if (!rpsRecord) {
            await this.createNewRound(gameId, wallet, 1, choice);
        } else {
            await this.isRoundFinished(gameId, wallet, choice);
        }
    }

    async createNewRound(gameId: number, wallet: string, round: number, result: string) {
        const rpsRecord = this.rpsRepository.create({
            gameId,
            wallets: wallet,
            round,
            result,
        });
        await this.rpsRepository.save(rpsRecord);
    }

    async isRoundFinished(gameId: number, wallet: string, choice: string) {
        const game = await this.gameRepository.findOne({
            where: {id: gameId},
            relations: ['gameRockPaperScissors', 'gamePlayers', 'gameData'],
        });

        const allRounds = await this.rpsRepository.find({
            where: {
                gameId,
                wallets: wallet
            }
        });

        const maxRound = Math.max(...allRounds.map(record => record.round));

        const countPlayersMadeChoice = await this.rpsRepository.count({
            where: {
                gameId,
                round: maxRound
            }
        });

        if (countPlayersMadeChoice === game?.gameData.playersNumber) {
            const currentRound = maxRound + 1;
            await this.createNewRound(gameId, wallet, currentRound, choice);
        } else {
        }
    }

    async getRoundsInfo(gameId: number): Promise<IRoundResult[]> {
        const rounds = await this.rpsRepository.find({
            where: {gameId},
            order: {round: 'ASC'}
        });

        const result: IRoundResult[] = [];

        for (const round of rounds) {
            if (round.round === null || round.wallets === null || round.result === null) {
                continue;
            }

            const existingRound = result.find(r => r.roundNumber === round.round);

            if (existingRound) {
                existingRound.players.push({
                    wallet: round.wallets,
                    choice: round.result
                });
            } else {
                result.push({
                    roundNumber: round.round,
                    players: [{
                        wallet: round.wallets,
                        choice: round.result
                    }]
                });
            }
        }
        return result;
    }
}
