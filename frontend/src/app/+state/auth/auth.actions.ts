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
export const loginSuccess = createAction(
  '[Auth] loginSuccess',
  props<{ response: IPlayer }>()
);

export const loginError = createAction(
  '[Auth] loginError',
  props<{ error: string }>()
);
export const setSidebar = createAction(
  '[Auth] setSidebar',
  props<{ sidebarValue: boolean }>()
);

export const logout = createAction( '[Auth] logout');
export const checkAuth = createAction('[Auth] checkAuth');
export const clearPlayer = createAction('[Auth] clearPlayer');

