import { createAction, props } from '@ngrx/store';
import {IRpsRoundsData} from './rps-game.reducer';

export const setRpsRoundsData = createAction(
  '[RpsGame] setRoundsData',
  props<{ data: IRpsRoundsData }>()
);

export const setActiveGameElements = createAction(
  '[RpsGame] setActiveGameElements',
  props<{ data: string }>()
);

export const resetActiveGameElements = createAction('[RpsGame] resetActiveGameElements');


