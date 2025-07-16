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
export const createGame = createAction(
  '[GameData] createGame',
  props<{typeGame: string, playersNumber: number, bet: number}>()
);
export const loadGameListSuccess = createAction(
  '[GameData] loadGameListSuccess',
  props<{data: any}>()
);
export const joinGame = createAction(
  '[GameData] joinGame',
  props<{game: number, wallet: string, gameName: string}>()
);
export const leaveGame = createAction(
  '[GameData] leaveGame',
  props<{gameId: number, wallet: string, game: string}>()
);
export const loadDataGameSuccess = createAction(
  '[GameData] loadDataGameSuccess',
  props<{data: any}>()
);

export const leaveGameSuccess = createAction('[GameData] leaveGameSuccess');

