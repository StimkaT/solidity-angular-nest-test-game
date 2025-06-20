import { Routes } from '@angular/router';
import {CardGamesContainerComponent} from './containers/card-games-container/card-games-container.component';
import {RockPaperScissorsGameComponent} from './components/rock-paper-scissors-game/rock-paper-scissors-game.component';
import {ActiveGameListComponent} from './components/active-game-list/active-game-list.component';

export const routes: Routes = [
  { path: '', component: CardGamesContainerComponent },
  { path: 'rock-paper-scissors', component: ActiveGameListComponent },
  { path: '**', component: CardGamesContainerComponent } // fallback 404
];
