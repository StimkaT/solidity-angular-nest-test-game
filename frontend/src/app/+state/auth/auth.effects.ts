import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  addAccount,
  checkAuth,
  clearPlayer,
  login,
  loginError,
  loginSuccess,
  logout,
} from './auth.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {RegistrationService} from '../../services/registration.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ethers} from 'ethers';
import {of} from 'rxjs';

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
        tap(async (action) => {
          const data = { ...action.data };
          if (!data.wallet || data.wallet === '') {
            try {
              const wallet = ethers.Wallet.createRandom();
              data.wallet = wallet.address;
              data.encryptedPrivateKey = wallet.privateKey;
            } catch (err) {
              console.error('Error creating wallet:', err);
              return;
            }
          }

          this.registrationService.addNewUser(data).subscribe({
            next: (response) => {
              this.dialog.closeAll();
            },
            error: (err) => {
              console.error('Error creating user:', err);
            }
          });
        })
      ),
    { dispatch: false }
  );

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap((action) =>
        this.registrationService.checkAuth(action.data).pipe(
          tap(res => {
            localStorage.setItem('playerData', JSON.stringify({
              token: res.token,
              login: res.login,
              wallet: res.wallet,
              isLogin: true
            }));
            this.dialog.closeAll();
          }),
          map(res => loginSuccess({ response: res })),
          catchError(err => of(loginError({ error: err })))
        )
      )
    )
  );

  checkAuth$ = createEffect(() =>
      this.actions$.pipe(
        ofType(checkAuth),
        tap(() => {
          const raw = localStorage.getItem('playerData');
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              this.store.dispatch(loginSuccess({ response: parsed }));
            } catch (e) {
              console.error('Error reading playerData from localStorage:', e);
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
            console.error('Error logging out:', error);
          }
        })
      ),
    { dispatch: false }
  );
}
