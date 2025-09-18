import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions'
import {API} from '../../models/api';

export const AUTH_FEATURE_KEY = 'auth';

export interface IAuthApi extends API {
  response: any;
}

export interface IPlayer {
  id?: string;
  login: string;
  password: string;
  wallet: string;
  encryptedPrivateKey?: string;
  isLogin: boolean;
}

export interface AuthState {
  player: IPlayer;
  authApi: IAuthApi;
  sidebarValue: boolean;
}

export interface SettingsPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  player: {
    id: '',
    wallet: '',
    login: '',
    password: '',
    isLogin: false
  },
  authApi: {
    startTime: null,
    loadingTime: null,
    isLoading: false,
    isLoaded: false,
    response: null
  },
  sidebarValue: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    authApi: {
      ...state.authApi,
      isLoading: true,
      isLoaded: false,
      loadingStart: Date.now(),
    }
  })),
  on(AuthActions.loginSuccess, (state, {response}) => ({
    ...state,
    authApi: {
      ...state.authApi,
      isLoading: false,
      isLoaded: true,
      loadingTime: Date.now() - (state.authApi.startTime || 0),
      response: response
    },
    player: {
      ...state.player,
      id: response.id,
      login: response.login,
      password: response.password,
      wallet: response.wallet,
      isLogin: true
    }
  })),
  on(AuthActions.loginError, (state, {error}) => ({
    ...state,
    authApi: {
      ...state.authApi,
      isLoading: false,
      isLoaded: false,
      loadingTime: Date.now() - (state.authApi.startTime || 0),
      response: error
    }
  })),

  on(AuthActions.setSidebar, (state, {sidebarValue}) => ({
    ...state,
    sidebarValue
  })),

  on(AuthActions.clearPlayer, (state) => ({
    ...state,
    player: initialState.player
  })),

);
