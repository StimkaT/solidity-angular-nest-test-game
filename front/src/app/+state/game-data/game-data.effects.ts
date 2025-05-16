import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {loadGameData, loadGameDataFailure, loadGameDataSuccess} from './game-data.actions';
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
          this.gameDataService.setGameData(action).subscribe({
            next: (data) => this.store.dispatch(loadGameDataSuccess({ data })),
            error: (error) => this.store.dispatch(loadGameDataFailure({ error })),
          });
          this.gameDataService.getGameData().subscribe({
            next: (data) =>console.log(data),
            error: (error) => this.store.dispatch(loadGameDataFailure({ error })),
          });
        })
      ),
    { dispatch: false }
  );

}
