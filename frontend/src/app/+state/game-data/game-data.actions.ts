import { createAction, props } from '@ngrx/store';
import { IPlayer } from './game-data.reducer';

export const loadGameData = createAction(
  '[GameData] loadGameData',
  props<{ data: any }>()
);
export const loadGameDataSuccess = createAction(
  '[GameData] loadGameDataSuccess',
  props<{ data: any }>()
);
export const loadGameDataFailure = createAction(
  '[GameData] loadGameDataFailure',
  props<{ error: any }>()
);
export const setSelectedPlayerList = createAction(
  '[GameData] setSelectedPlayerList',
  props<{ selectedPlayerList: string[] }>()
);
export const setLaunchTime = createAction(
  '[GameData] setLaunchTime',
  props<{ launchTime: string }>()
);
export const getGameData = createAction(
  '[GameData] getGameData',
  props<{ data: string }>()
);
export const setSelectedPlayerListData = createAction(
  '[GameData] setSelectedPlayerListData',
  props<{ playerList: IPlayer[] }>()
);
export const getActiveGames = createAction(
  '[GameData] getActiveGames',
  props<{ game: string }>()
);
export const getDataGame = createAction(
  '[GameData] getDataGame',
  props<{ game: any }>()
);
export const setWebSocketConnection = createAction(
  '[GameData] setWebSocketConnection',
  props<{ gameId: number }>()
);
export const closeWebSocketConnection = createAction(
  '[GameData] closeWebSocketConnection',
  props<{ gameId: number }>()
);
export const getDataGameAndSetWebSocket = createAction(
  '[GameData] getDataGameAndSetWebSocket',
  props<{ game: any }>()
);
export const createGame = createAction(
  '[GameData] createGame',
  props<{typeGame: string, playersNumber: number, bots: number, bet: number}>()
);
export const loadGameListSuccess = createAction(
  '[GameData] loadGameListSuccess',
  props<{data: any}>()
);
export const createGameSuccess = createAction('[GameData] createGameSuccess');
export const makeAction = createAction(
  '[GameData] makeAction',
  props<{result: string}>()
);
export const makeActionWithoutData = createAction('[GameData] makeActionWithoutData');
export const joinGame = createAction(
  '[GameData] joinGame',
);
export const sendMoney = createAction(
  '[GameData] sendMoney',
);
export const sendMoneySuccess = createAction(
  '[GameData] sendMoneySuccess',
  props<{ response: any }>()
);
export const sendMoneyFailure = createAction(
  '[GameData] sendMoneyFailure',
  props<{ error: any }>()
);
export const setGameData = createAction(
  '[GameData] setGameData',
  props<{data: any}>()
);
export const gameError = createAction(
  '[GameData] gameError',
  props<{error: any}>()
);

export const setTimer = createAction(
  '[GameData] setTimer',
  props<{gameId: number, second: number, title: string}>()
);

export const leaveGame = createAction(
  '[GameData] leaveGame',
);
export const disconnectGame = createAction(
  '[GameData] disconnectGame',
);
export const getGameTypes = createAction('[GameData] getGameTypes');
export const getGameTypesSuccess = createAction(
  '[GameData] getGameTypesSuccess',
  props<{data: any}>()
);
export const setNameToken = createAction(
  '[GameData] setNameToken',
  props<{name: string | null}>()
);
export const setBalancePlayer = createAction(
  '[GameData] setBalancePlayer',
  props<{balance: string}>()
);
export const setNetworkName = createAction(
  '[GameData] setNetworkName',
  props<{name: string}>()
);


