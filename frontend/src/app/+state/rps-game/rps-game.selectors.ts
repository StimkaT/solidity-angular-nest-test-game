import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IRoundsViewData, RPS_GAME_FEATURE_KEY, RpsGameState} from './rps-game.reducer';
import {getPlayer} from '../auth/auth.selectors';

export const selectRPSGameState = createFeatureSelector<RpsGameState>(RPS_GAME_FEATURE_KEY);
export const getActiveRoundRpc = createSelector(
  selectRPSGameState,
  (state: RpsGameState) => state.gamesRounds.activeRound
);

export const getGameElements = createSelector(
  selectRPSGameState,
  (state: RpsGameState) => state.gameElements
);

export const selectRpsGameDataRounds = createSelector(
  selectRPSGameState,
  (state: RpsGameState) => state.gamesRounds
);

export const selectRpsDataRound = createSelector(
  selectRPSGameState,
  (state: RpsGameState) => state.gamesRounds.roundsData[state.gamesRounds.roundsData.length - 1],
);

export const selectRpsRoundsViewData = createSelector(
  selectRpsGameDataRounds,
  (rounds): IRoundsViewData => {
    if (!rounds?.roundsData?.length) {
      return { roundsData: [], playerList: [], hasData: false };
    }

    const enhancedRoundsData = rounds.roundsData.map(round => ({
      ...round,
      playerDataMap: new Map(round.players.map(p => [p.name, p]))
    }));

    const playerList = Array.from(
      new Set(
        enhancedRoundsData.flatMap(round =>
          round.players.map(p => p.name)
        )
      )
    );

    return {
      roundsData: enhancedRoundsData,
      playerList,
      hasData: true
    };
  }
);

export const youLost = createSelector(
  selectRpsDataRound,
  getPlayer,
  (dataRound, player) => {
    if (!dataRound || !dataRound.players || !player) {
      return false;
    }
    return !dataRound.players.some(
      (playerRound: any) => playerRound.wallet === player.wallet && playerRound.isPlaying
    );
  }
);
