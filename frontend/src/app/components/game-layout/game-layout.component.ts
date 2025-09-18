import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {TimerComponent} from '../timer/timer.component';

@Component({
  selector: 'app-game-layout',
  imports: [
    MatButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    TimerComponent,
  ],
  standalone: true,
  templateUrl: './game-layout.component.html',
  styleUrl: './game-layout.component.scss'
})
export class GameLayoutComponent {
  @Input() link: string = '';
  @Input() activeGamesList: any;
  @Input() player: any;
  @Input() active: boolean = false;
  @Input() isConnected= false;
  @Input() gameData: any;
  @Input() timer: any;
  @Input() round: number | null = null;
  @Input() playerIsBet: boolean = false;

  @Output() emitter = new EventEmitter();

  event(event: string) {
    const message = {
      event: `GameLayoutComponent:${event}`,
      wallet: this.player.wallet,
      title: this.gameData.type
    }
    this.emitter.emit(message)
  }

  sendEvent(event: string) {
    const message = {
      event: `Game:${event}`,
    };
    this.emitter.emit(message);
  }
}
