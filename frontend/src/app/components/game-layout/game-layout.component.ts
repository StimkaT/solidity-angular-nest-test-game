import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-game-layout',
  imports: [
    MatButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './game-layout.component.html',
  styleUrl: './game-layout.component.scss'
})
export class GameLayoutComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() activeGamesList: any;
  @Input() player: any;
  @Input() active: boolean = false;
  @Input() gameData: any;

  @Output() emitter = new EventEmitter();

  event(event: string) {
    const message = {
      event: `GameLayoutComponent:${event}`,
      wallet: this.player.wallet,
      title: this.title
    }
    this.emitter.emit(message)
  }
}
