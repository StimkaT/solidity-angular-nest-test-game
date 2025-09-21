import { ApplicationConfig, provideZoneChangeDetection, isDevMode, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {AuthInterceptor} from './services/auth.interceptor';
import {ErrorInterceptor} from './services/error.interceptor';
import {ValidationErrorInterceptor} from './services/validation-error.interceptor';
import {GlobalErrorHandlerService} from './services/global-error-handler.service';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {GAME_DATA_FEATURE_KEY, gameDataReducer} from './+state/game-data/game-data.reducer';
import {RPS_GAME_FEATURE_KEY, rpsGameReducer} from './+state/rps-game/rps-game.reducer';
import {AUTH_FEATURE_KEY, authReducer} from './+state/auth/auth.reducer';
import {GameDataEffects} from './+state/game-data/game-data.effects';
import {AuthEffects} from './+state/auth/auth.effects';
import {RpsGameEffects} from './+state/rps-game/rps-game.effects';
import {DICE_GAME_FEATURE_KEY, diceGameReducer} from './+state/dice-game/dice-game.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(
      withInterceptors([AuthInterceptor, ValidationErrorInterceptor, ErrorInterceptor])
    ),
    provideEffects([
      GameDataEffects,
      AuthEffects,
      RpsGameEffects,
    ]),
    provideStore({
      [GAME_DATA_FEATURE_KEY]: gameDataReducer,
      [RPS_GAME_FEATURE_KEY]: rpsGameReducer,
      [DICE_GAME_FEATURE_KEY]: diceGameReducer,
      [AUTH_FEATURE_KEY]: authReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ]
};
