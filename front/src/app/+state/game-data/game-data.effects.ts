import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {getGameData, loadGameData, loadGameDataFailure, loadGameDataSuccess} from './game-data.actions';
import {GameDataService} from '../../services/game-data.service';
import {Store} from '@ngrx/store';

@Injectable()
export class GameDataEffects {
  private actions$ = inject(Actions);
  private gameDataService = inject(GameDataService);
  private store = inject(Store);

  loadGameData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadGameData),
        tap((action) => {
          console.log('WAIT', action)
          this.gameDataService.setGameData(action.data).subscribe({
            next: (data) => {
              this.store.dispatch(loadGameDataSuccess({ data: data.contractAddress }));
              console.log(data)
            },
            error: (error) => this.store.dispatch(loadGameDataFailure({ error })),
          });
        })
      ),
    { dispatch: false }
  );


  getGameData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getGameData),
        tap(async (action) => {
          this.gameDataService.getGameData(action.data).subscribe({
            next: (data) =>console.log(data),
            error: (error) => this.store.dispatch(loadGameDataFailure({ error })),
          });
        })
      ),
    { dispatch: false }
  );

}
