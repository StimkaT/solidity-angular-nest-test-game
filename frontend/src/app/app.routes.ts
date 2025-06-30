import { Routes } from '@angular/router';
import {CardGamesContainerComponent} from './containers/card-games-container/card-games-container.component';
import {
  ActiveGameListContainerComponent
} from './containers/active-game-list-container/active-game-list-container.component';

export const routes: Routes = [
  { path: '', component: CardGamesContainerComponent },
  { path: 'game-list', component: ActiveGameListContainerComponent },
  { path: '**', component: CardGamesContainerComponent } // fallback 404
];
