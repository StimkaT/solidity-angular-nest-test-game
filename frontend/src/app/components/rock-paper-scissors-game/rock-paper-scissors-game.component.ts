import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-rock-paper-scissors-game',
  imports: [
    MatButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrl: './rock-paper-scissors-game.component.scss'
})
export class RockPaperScissorsGameComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() activeGamesList: any;
  @Input() player: any;
  @Input() gameId: any;

  @Output() emitter = new EventEmitter();

  event(event: string) {
    const message = {
      event: `RockPaperScissorsGameComponent:${event}`,
      wallet: this.player.wallet,
      title: this.title
    }
    this.emitter.emit(message)
  }

}
