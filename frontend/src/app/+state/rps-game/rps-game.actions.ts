import { createAction, props } from '@ngrx/store';
import {IActiveGameRps} from './rps-game.reducer';

export const setRpsRoundsData = createAction(
  '[RpsGame] setRoundsData',
  props<{ data: IActiveGameRps }>()
);

export const setActiveGameElements = createAction(
  '[RpsGame] setActiveGameElements',
  props<{ data: string }>()
);

export const resetActiveGameElements = createAction('[RpsGame] resetActiveGameElements');


