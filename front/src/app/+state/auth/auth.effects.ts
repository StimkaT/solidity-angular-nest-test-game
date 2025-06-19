import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {addAccount, login} from './auth.actions';
import {switchMap, tap} from 'rxjs/operators';
import {RegistrationService} from '../../services/registration.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private registrationService = inject(RegistrationService);
  private store = inject(Store);

  addAccount$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addAccount),
        tap((action) => {
          console.log('Данные из эффекта:', action.data);
        }),
        switchMap((action) => {
          // const jsonData = JSON.stringify(action.data);
          return this.registrationService.addNewUser(action.data).pipe(
            tap(response => console.log('Пользователь создан:', response))
          );
        })
      ),
    { dispatch: false }
  );

  auth$ = createEffect(() =>
      this.actions$.pipe(
        ofType(login),
        tap((action) => {
          this.registrationService.checkAuth(action.data).subscribe(
            res => {
              console.log('Успешный логин:', res);
            },
            err => {
              console.error('Ошибка логина:', err);
            }
          );
        })
      ),
    { dispatch: false }
  );


}
