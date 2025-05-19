import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GAME_DATA_FEATURE_KEY, GameDataState} from './game-data.reducer';

export const selectGameDataState = createFeatureSelector<GameDataState>(GAME_DATA_FEATURE_KEY);
export const selectSelectedPlayerList = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.selectedPlayerList
);
export const selectPlayerList = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.playerList
);
export const selectSelectedPlayerListData = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.gameData.playerList
);
export const selectGameData = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.gameData
);
export const selectGameDataAddress = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.gameDataAddress
);
