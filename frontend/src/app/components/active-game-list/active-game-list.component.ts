import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-active-game-list',
  standalone: true,
  imports: [
    MatButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './active-game-list.component.html',
  styleUrl: './active-game-list.component.scss'
})
export class ActiveGameListComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() activeGamesList: any;
  @Input() player: any;

  @Output() emitter = new EventEmitter();

  event(event: string, title: string) {
    const message = {
      event: `ActiveGameListComponent:${event}`,
      title,
    }
    this.emitter.emit(message)
  }

  manage(manage: string, gameId: string, title: string) {
    const message = {
      event: `ActiveGameListComponent:${manage}`,
      wallet: this.player.wallet,
      gameId: gameId,
      title
    }
    this.emitter.emit(message)
  }

}
