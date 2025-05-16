import { Routes } from '@angular/router';
import {AppComponent} from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'game', component: AppComponent },
  { path: '**', component: AppComponent } // fallback 404
];
