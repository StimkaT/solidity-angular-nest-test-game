import { Routes } from '@angular/router';
import {CardGamesContainerComponent} from './containers/card-games-container/card-games-container.component';
import {
  ActiveGameListContainerComponent
} from './containers/active-game-list-container/active-game-list-container.component';
import {
  GameShellContainerComponent
} from './containers/game-shell-container/game-shell-container.component';

export const routes: Routes = [
  { path: 'game-list/:game-type', component: ActiveGameListContainerComponent },
  { path: 'game/:id', component: GameShellContainerComponent },
  { path: '', component: CardGamesContainerComponent },
  { path: '**', component: CardGamesContainerComponent } // fallback 404
];
