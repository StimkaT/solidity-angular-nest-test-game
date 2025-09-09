import { createAction, props } from '@ngrx/store';
import {IActiveGameRps} from '../rps-game/rps-game.reducer';

export const getResultDiceGame = createAction('[DiceGame] getResultDiceGame');

export const setDiceRoundsData = createAction(
  '[RpsGame] setDiceRoundsData',
  props<{ data: IActiveGameRps }>()
);

// export const setDiceRoundsData = createAction(
//   '[DiceGame] setDiceRoundsData',
//   props<{ data: IActiveGameRps }>()
// );
//
// export const setActiveDiceGameElements = createAction(
//   '[DiceGame] setActiveDiceGameElements',
//   props<{ data: string }>()
// );
//
// export const resetActiveDiceGameElements = createAction('[DiceGame] resetActiveDiceGameElements');
//

