import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AUTH_FEATURE_KEY, AuthState} from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getUserData = createSelector(
  selectAuthState,
  (state) => state.player
);
