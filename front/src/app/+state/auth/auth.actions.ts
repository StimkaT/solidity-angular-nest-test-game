import { createAction, props } from '@ngrx/store';
import {IPlayer} from './auth.reducer';

export const loadGameData = createAction(
  '[Auth] loadGameData',
  props<{ data: any }>()
);
export const addAccount = createAction(
  '[Auth] addAccount',
  props<{ data: IPlayer }>()
);
export const login = createAction(
  '[Auth] login',
  props<{ data: {login: string, password: string} }>()
);
