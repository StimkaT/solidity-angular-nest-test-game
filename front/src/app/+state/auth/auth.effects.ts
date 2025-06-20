import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addAccount, checkAuth, clearPlayer, login, loginError, loginSuccess, logout} from './auth.actions';
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
              localStorage.setItem('playerData', JSON.stringify({
                id: res.token.id,
                login: res.token.login,
                password: res.token.password,
                wallet: res.token.wallet,
                isLogin: true
              }));
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

  checkAuth$ = createEffect(() =>
      this.actions$.pipe(
        ofType(checkAuth),
        tap(() => {
          const raw = localStorage.getItem('playerData');
          console.log('raw', raw)
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              this.store.dispatch(loginSuccess({ response: parsed }));
            } catch (e) {
              console.error('Ошибка чтения playerData из localStorage:', e);
            }
          }
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(() =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          try {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('playerData');
            this.store.dispatch(clearPlayer())
            this.dialog.closeAll();
            this.router.navigate([''], {});
          } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
          }
        })
      ),
    { dispatch: false }
  );
}
