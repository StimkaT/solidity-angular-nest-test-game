import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addAccount, login, loginError, loginSuccess} from './auth.actions';
import {tap} from 'rxjs/operators';
import {RegistrationService} from '../../services/registration.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private registrationService = inject(RegistrationService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private store = inject(Store);


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
              localStorage.setItem('jwtToken', res.token.token);
              this.store.dispatch(loginSuccess({ response: res.token }))
              this.dialog.closeAll();
              this.router.navigate(['']);
            },
            err => {
              this.store.dispatch(loginError({error: err}))
            }
          );
        })
      ),
    { dispatch: false }
  );
}
