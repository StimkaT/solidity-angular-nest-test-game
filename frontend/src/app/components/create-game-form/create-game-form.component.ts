import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-game-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  standalone: true,
  templateUrl: './create-game-form.component.html',
  styleUrl: './create-game-form.component.scss'
})
export class CreateGameFormComponent {
  @Output() emitter = new EventEmitter();
  playersNumber = 2;
  bet = 100;

  events(event: string) {
    if (event === 'create') {
      const message = {
        event: 'CreateGameFormComponent:create',
        data: {
          players: this.playersNumber,
          bet: this.bet,
        },
      };
      this.emitter.emit(message);
    } else if (event === 'cancel') {
      const message: any = {
        event: 'CreateGameFormComponent:cancel',
      };
      this.emitter.emit(message);
    }
  }



}
