import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DICE_GAME_FEATURE_KEY, DiceGameState} from './dice-game.reducer';

export const selectDiceGameState = createFeatureSelector<DiceGameState>(DICE_GAME_FEATURE_KEY);
// export const getActiveRound = createSelector(
//   selectRPSGameState,
//   (state: RpsGameState) => state.gamesRounds.activeRound
// );
//
// export const getGameElements = createSelector(
//   selectRPSGameState,
//   (state: RpsGameState) => state.gameElements
// );
//
// export const selectRpsGameDataRounds = createSelector(
//   selectRPSGameState,
//   (state: RpsGameState) => state.gamesRounds
// );
//
// export const selectRpsDataRound = createSelector(
//   selectRPSGameState,
//   (state: RpsGameState) => state.gamesRounds.roundsData[state.gamesRounds.roundsData.length - 1],
// );
//
// export const selectRoundsViewData = createSelector(
//   selectRpsGameDataRounds,
//   (rounds): IRoundsViewData => {
//     if (!rounds?.roundsData?.length) {
//       return { roundsData: [], playerList: [], hasData: false };
//     }
//
//     const enhancedRoundsData = rounds.roundsData.map(round => ({
//       ...round,
//       playerDataMap: new Map(round.players.map(p => [p.name, p]))
//     }));
//
//     const playerList = Array.from(
//       new Set(
//         enhancedRoundsData.flatMap(round =>
//           round.players.map(p => p.name)
//         )
//       )
//     );
//
//     return {
//       roundsData: enhancedRoundsData,
//       playerList,
//       hasData: true
//     };
//   }
// );
