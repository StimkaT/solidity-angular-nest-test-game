import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RPS_GAME_FEATURE_KEY, RpsGameState} from './rps-game.reducer';

export const selectRPSGameState = createFeatureSelector<RpsGameState>(RPS_GAME_FEATURE_KEY);
export const selectRpsGameDataRounds = createSelector(
  selectRPSGameState,
  (state: RpsGameState) => state.gamesRounds
);
export const getActiveRound = createSelector(
  selectRPSGameState,
  (state: RpsGameState) => state.gamesRounds.activeRound
);
