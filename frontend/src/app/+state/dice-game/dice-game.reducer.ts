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

export interface IOrderOfThrows {
  activeWallet: string;
  diceCounts: number[] | null;
}

export interface IActiveGameDice extends IActiveGameList {
  type: 'dice';
  activeRound: number | null;
  roundsData: IRoundResult[];
  orderOfThrows: IOrderOfThrows;
}

export interface DiceGameState {
  gamesRounds: IActiveGameDice;
}

export interface IEnhancedRoundResult extends IRoundResult {
  playerDataMap: Map<string, IPlayerRoundData>;
}

export interface IRoundsViewData {
  roundsData: IEnhancedRoundResult[];
  playerList: string[];
  hasData: boolean;
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
    orderOfThrows: {
      activeWallet: '',
      diceCounts: [0, 0],
    }
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
          typeResult: 'text',
          result: player.result,
        })),
      })),
      orderOfThrows: data.orderOfThrows
    };

    return {
      ...state,
      gamesRounds: gameData
    };
  }),
);
