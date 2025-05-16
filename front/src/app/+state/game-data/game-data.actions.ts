import { createAction, props } from '@ngrx/store';

// export const loadGameData = createAction('[GameData] loadGameData');
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
export const getGameData = createAction(
  '[GameData] getGameData',
  props<{ data: string }>()
);
// export const loadGameDataSuccess = createAction(
//   '[GameData] loadGameDataSuccess',
//   props<{ data: any }>()
// );
// export const loadGameDataFailure = createAction(
//   '[GameData] loadGameDataFailure',
//   props<{ error: any }>()
// );
