import { createAction, props } from '@ngrx/store';
import {IPlayer} from './game-data.reducer';

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
