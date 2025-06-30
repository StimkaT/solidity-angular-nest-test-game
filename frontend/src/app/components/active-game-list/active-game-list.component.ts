import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-active-game-list',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './active-game-list.component.html',
  styleUrl: './active-game-list.component.scss'
})
export class ActiveGameListComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() activeGamesList: any;

  @Output() emitter = new EventEmitter();

  openCreateGameModal() {
    const message = {
      event: 'ActiveGameListComponent:create'
    }
    this.emitter.emit(message)
  }

}
