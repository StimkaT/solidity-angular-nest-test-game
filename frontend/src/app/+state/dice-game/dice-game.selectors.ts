import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DICE_GAME_FEATURE_KEY, DiceGameState, IRoundsViewData} from './dice-game.reducer';
import {getPlayer} from '../auth/auth.selectors';

export const selectDiceGameState = createFeatureSelector<DiceGameState>(DICE_GAME_FEATURE_KEY);

export const selectDiceDataRound = createSelector(
  selectDiceGameState,
  (state: DiceGameState) => state.gamesRounds.roundsData[state.gamesRounds.roundsData.length - 1],
);

export const getActiveRoundDice = createSelector(
  selectDiceGameState,
  (state: DiceGameState) => state.gamesRounds.activeRound
);

export const getOrderOfThrows = createSelector(
  selectDiceGameState,
  (state: DiceGameState) => state.gamesRounds.orderOfThrows
);

export const isYourPlay = createSelector(
  getOrderOfThrows,
  getPlayer,
  (orderOfThrows, player) => {
    return orderOfThrows.activeWallet === player.wallet;
  }
);

export const selectDiceGameDataRounds = createSelector(
  selectDiceGameState,
  (state: DiceGameState) => state.gamesRounds
);

export const selectDiceRoundsViewData = createSelector(
  selectDiceGameDataRounds,
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
