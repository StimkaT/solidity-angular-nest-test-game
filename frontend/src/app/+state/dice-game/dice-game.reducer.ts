import {createReducer, on,} from '@ngrx/store';
import * as DiceGameActions from './dice-game.actions';
import {IActiveGameList} from '../game-data/game-data.reducer';

export const DICE_GAME_FEATURE_KEY = 'dice-game';

export interface IPlayerRoundData {
  wallet: string;
  name: string;
  result: string;
  isPlaying: boolean;
  hasActed: boolean;
}

export interface IRoundResult {
  roundNumber: number;
  players: IPlayerRoundData[];
}

export interface IActiveGameDice extends IActiveGameList {
  type: 'dice';
  activeRound: number | null;
  roundsData: IRoundResult[];
}

export interface DiceGameState {
  gamesRounds: IActiveGameDice;
}

export interface SettingsPartialState {
  readonly [DICE_GAME_FEATURE_KEY]: DiceGameState;
}

export const initialState: DiceGameState = {
  gamesRounds: {
    id: 0,
    type: 'dice',
    status: '',
    finishedAt: null,
    createdAt: '',
    updatedAt: '',
    bet: 0,
    playersNumber: 0,
    playerNumberSet: 0,
    players: [],
    activeRound: null,
    roundsData: [],
  },
};

export const diceGameReducer = createReducer(
  initialState,
  on(DiceGameActions.setDiceRoundsData, (state, { data }) => {
    const gameData: IActiveGameDice = {
      ...data,
      type: 'dice',
      roundsData: (data.roundsData ?? []).map((round: IRoundResult) => ({
        ...round,
        players: (round.players ?? []).map((player: IPlayerRoundData) => ({
          ...player,
          result: player.result,
        })),
      })),
    };

    return {
      ...state,
      gamesRounds: gameData
    };
  }),
);
