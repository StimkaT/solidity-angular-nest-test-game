import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GameDataService} from '../../services/game-data.service';
import {Store} from '@ngrx/store';
import {addAccount} from './auth.actions';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private gameDataService = inject(GameDataService);
  private store = inject(Store);

  addAccount$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addAccount),
        tap((action) => {
          console.log('Данные из эффекта:', action.data);
        })
      ),
    {
      dispatch: false
    }
  );

}
