import {Component, inject, OnInit} from '@angular/core';
import {
  RockPaperScissorsGameComponent
} from '../../components/rock-paper-scissors-game/rock-paper-scissors-game.component';
import {Store} from '@ngrx/store';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {joinGame, leaveGame} from '../../+state/game-data/game-data.actions';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-rock-paper-scissors-game-container',
  imports: [
    RockPaperScissorsGameComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-game-container.component.html',
  styleUrl: './rock-paper-scissors-game-container.component.scss'
})
export class RockPaperScissorsGameContainerComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private wsService = inject(WebsocketService);

  gameId: number | null = null;

  getPlayer$ = this.store.select(getPlayer);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameId = Number(id.replace(':', ''));

      // this.wsService.joinGame(this.gameId, 'testUser');

      this.wsService.onGameStarted().subscribe(() => {
        alert('Игра началась!');
      });

    } else {
      this.gameId = null;
    }
  }

  events(event: any) {
    if (event.event === 'RockPaperScissorsGameComponent:leave') {
      this.store.dispatch(leaveGame({gameId: this.gameId!, wallet: event.wallet}))
      this.router.navigate(['/']);
    } else if (event.event === 'RockPaperScissorsGameComponent:observe') {
      this.store.dispatch(leaveGame({gameId: this.gameId!, wallet: event.wallet}))
    } else if (event.event === 'RockPaperScissorsGameComponent:connect') {
      this.store.dispatch(joinGame({game: this.gameId!, wallet: event.wallet, gameName: event.title}))
    } else if (event.event === 'RockPaperScissorsGameComponent:home') {
      this.router.navigate(['/game-list'], {
        queryParams: { link: event.title.toLowerCase(), title: event.title }
      });
    }
  }
}
