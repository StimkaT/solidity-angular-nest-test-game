import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore, StoreModule} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {GAME_DATA_FEATURE_KEY, gameDataReducer} from '../+state/game-data/game-data.reducer';
import {GameDataEffects} from '../+state/game-data/game-data.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideEffects([
      GameDataEffects,
    ]),
    provideStore({
      [GAME_DATA_FEATURE_KEY]: gameDataReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
