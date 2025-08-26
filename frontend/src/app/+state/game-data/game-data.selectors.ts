import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GAME_DATA_FEATURE_KEY, GameDataState} from './game-data.reducer';
import {getPlayer} from '../auth/auth.selectors';

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
export const getGameList = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.gameList
);
export const selectActiveGames = createSelector(
  selectGameDataState,
  (state: GameDataState) => [...state.activeGameList].reverse()
);
export const selectActiveGameData = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.activeGameData
);

export const selectGameTypes = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.gameTypes
);

export const selectIsConnectedGame = createSelector(
  selectActiveGameData,
  getPlayer,
  (activeGameData, player): boolean => {
    if (!activeGameData?.players || !player?.wallet) return false;
    return activeGameData.players.some(p => p.wallet === player.wallet);
  }
);
