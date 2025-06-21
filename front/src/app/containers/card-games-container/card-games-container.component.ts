import {Component, inject} from '@angular/core';
import {CardGameComponent} from '../../components/card-game/card-game.component';
import {Store} from '@ngrx/store';
import {getGameList} from '../../+state/game-data/game-data.selectors';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-games-container',
  imports: [
    CardGameComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './card-games-container.component.html',
  styleUrl: './card-games-container.component.scss'
})
export class CardGamesContainerComponent {
  private store = inject(Store);
  private router = inject(Router);

  getGameList$ = this.store.select(getGameList);

  navigateTo(link: string, title: string) {
    this.router.navigate(['/game-list'], {
      queryParams: { link: link, title: title }
    });
  }
}
