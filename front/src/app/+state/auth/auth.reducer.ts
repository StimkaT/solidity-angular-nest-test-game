import { createReducer, on } from '@ngrx/store';
export const AUTH_FEATURE_KEY = 'auth';

export interface IPlayer {
  id?: string;
  login: string;
  password: string;
  wallet?: string;
  isLogin: boolean;
}

export interface AuthState {
  player: IPlayer;
}

export interface SettingsPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  player: {
    id: '',
    login: '',
    password: '',
    isLogin: false
  },
};

export const authReducer = createReducer(
  initialState,
);
