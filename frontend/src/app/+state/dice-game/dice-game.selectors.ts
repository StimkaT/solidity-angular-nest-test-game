import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DICE_GAME_FEATURE_KEY, DiceGameState} from './dice-game.reducer';

export const selectDiceGameState = createFeatureSelector<DiceGameState>(DICE_GAME_FEATURE_KEY);

export const selectDiceDataRound = createSelector(
  selectDiceGameState,
  (state: DiceGameState) => state.gamesRounds.roundsData[state.gamesRounds.roundsData.length - 1],
);


export const getActiveRoundDice = createSelector(
  selectDiceGameState,
  (state: DiceGameState) => state.gamesRounds.activeRound
);
