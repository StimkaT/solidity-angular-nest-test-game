import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { GameReloadService } from '../../services/game-reload.service';

@Component({
  selector: 'app-active-game-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './active-game-list.component.html',
  styleUrl: './active-game-list.component.scss'
})
export class ActiveGameListComponent implements OnInit, OnDestroy {
  @Input() gameType: string = '';
  @Input() activeGamesList: any;
  @Input() player: any;

  @Output() emitter = new EventEmitter();

  constructor(private reloadService: GameReloadService) {}

  ngOnInit() {
    this.reloadService.startReload((gameType) => {
      this.event('reload', gameType);
    }, this.gameType);
  }

  event(event: string, title: string) {
    const message = {
      event: `ActiveGameListComponent:${event}`,
      title,
    };
    this.emitter.emit(message);
  }

  manage(manage: string, gameId: string, title: string) {
    const message = {
      event: `ActiveGameListComponent:${manage}`,
      wallet: this.player.wallet,
      gameId: gameId,
      title
    };
    this.emitter.emit(message);
  }

  ngOnDestroy() {
    this.reloadService.stopReload();
  }
}
