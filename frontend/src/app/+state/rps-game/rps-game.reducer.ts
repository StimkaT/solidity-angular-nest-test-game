import {createReducer, on,} from '@ngrx/store';
import * as RpsGameActions from './rps-game.actions';

export const RPS_GAME_FEATURE_KEY = 'rps-game';

export interface IRoundResult {
  roundNumber: number;
  players: {
    wallet: string;
    choice?: string;
    status?: string;
  }[];
}

export interface IRpsRoundsData {
  gameId: number;
  activeRound: number | null;
  gamePlayers: string[];
  roundsData: IRoundResult[];
}

export interface RpsGameState {
  gamesRounds: IRpsRoundsData;
}

export interface SettingsPartialState {
  readonly [RPS_GAME_FEATURE_KEY]: RpsGameState;
}

export const initialState: RpsGameState = {
  gamesRounds: {
    gameId: 0,
    activeRound: null,
    gamePlayers: [],
    roundsData: []
  },
};

export const rpsGameReducer = createReducer(
  initialState,
  on(RpsGameActions.setRpsRoundsData, (state, { data }) => ({
    ...state,
    gamesRounds: data
  })),
);
