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
export const selectActiveGamesWaitPlayers = createSelector(
  selectGameDataState,
  (state: GameDataState) => [...state.activeGameList]
    .filter(game =>
      game.contractAddress === null &&
      game.playersNumber > game.playerNumberSet
    )
    .reverse()
);
export const selectActiveGamesInProgress = createSelector(
  selectGameDataState,
  (state: GameDataState) => [...state.activeGameList]
    .filter(game =>
      game.contractAddress !== null &&
      game.finishedAt === null
    )
    .reverse()
);
export const selectActiveGamesFinished = createSelector(
  selectGameDataState,
  (state: GameDataState) => [...state.activeGameList]
    .filter(game =>
      game.finishedAt !== null
    )
    .reverse()
);
export const selectActiveGameData = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.activeGameData
);

export const selectNameWinner = createSelector(
  selectGameDataState,
  (state) => {
    const players = state.activeGameData.players;
    if (!players || !players.length) return null;

    const winner = players.reduce((prev, current) => {
      const currentWin = current.win ?? 0;
      const prevWin = prev.win ?? 0;
      return currentWin > prevWin ? current : prev;
    }, players[0]);

    return winner.name;
  }
);

export const selectGameTypes = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.gameTypes
);

export const getTimer = createSelector(
  selectGameDataState,
  selectActiveGameData,
  (GameDataState, activeGameData) => {
    if (activeGameData?.id) {
      const gameTimer = GameDataState.timer.find(timer => timer.gameId === activeGameData.id);

      return gameTimer?.second ?? 0;
    }
    return 0;
  }
);

export const selectIsConnectedGame = createSelector(
  selectActiveGameData,
  getPlayer,
  (activeGameData, player): boolean => {
    if (!activeGameData?.players || !player?.wallet) return false;
    return activeGameData.players.some(p => p.wallet === player.wallet);
  }
);

export const selectIsBetGame = createSelector(
  selectActiveGameData,
  getPlayer,
  (activeGameData, player): boolean => {
    if (!activeGameData?.players || !player?.wallet) return false;

    return activeGameData.players.some(p =>
      p.wallet === player.wallet && p.bet
    );
  }
);

export const createGameIsLoading = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.createGameAPI.isLoading
);
export const createGameIsLoaded = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.createGameAPI.isLoaded
);

export const paymentGameIsLoading = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.paymentGameAPI.isLoading
);
export const paymentGameIsLoaded = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.paymentGameAPI.isLoaded
);
export const getBalanceData = createSelector(
  selectGameDataState,
  (state: GameDataState) => state.balanceData
);
