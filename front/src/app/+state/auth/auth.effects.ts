import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addAccount, login} from './auth.actions';
import {switchMap, tap} from 'rxjs/operators';
import {RegistrationService} from '../../services/registration.service';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private registrationService = inject(RegistrationService);
  private dialog = inject(MatDialog);


  addAccount$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addAccount),
        tap((action) => {
          this.registrationService.addNewUser(action.data).subscribe({
            next: (response) => {
              console.log('Пользователь создан:', response);
              this.dialog.closeAll();
            },
            error: (err) => {
              console.error('Ошибка создания пользователя:', err);
            }
          });
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
              this.dialog.closeAll();
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
