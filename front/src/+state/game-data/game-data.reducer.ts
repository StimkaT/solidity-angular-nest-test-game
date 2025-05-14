import { createReducer, on } from '@ngrx/store';
import * as GameDataActions from './game-data.actions';


export const GAME_DATA_FEATURE_KEY = 'game-data';

export interface GameDataState {
}

export interface SettingsPartialState {
  readonly [GAME_DATA_FEATURE_KEY]: GameDataState;
}

export const initialState: GameDataState = {
};

export const gameDataReducer = createReducer(
  initialState,
);
