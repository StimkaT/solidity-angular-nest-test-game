import { createAction, props } from '@ngrx/store';
import {IActiveGameDice} from './dice-game.reducer';

export const getResultDiceGame = createAction('[DiceGame] getResultDiceGame');

export const setDiceRoundsData = createAction(
  '[RpsGame] setDiceRoundsData',
  props<{ data: IActiveGameDice }>()
);
