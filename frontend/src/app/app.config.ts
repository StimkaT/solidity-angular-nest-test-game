import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {GAME_DATA_FEATURE_KEY, gameDataReducer} from './+state/game-data/game-data.reducer';
import {GameDataEffects} from './+state/game-data/game-data.effects';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AuthEffects} from './+state/auth/auth.effects';
import {AUTH_FEATURE_KEY, authReducer} from './+state/auth/auth.reducer';
import {AuthInterceptor} from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    provideEffects([
      GameDataEffects,
      AuthEffects
    ]),
    provideStore({
      [GAME_DATA_FEATURE_KEY]: gameDataReducer,
      [AUTH_FEATURE_KEY]: authReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
