import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RegisterButtonComponent } from '../register-button/register-button.component';
import { LoginButtonComponent } from '../login-button/login-button.component';

@Component({
  selector: 'app-create-game-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, RegisterButtonComponent, LoginButtonComponent],
  standalone: true,
  templateUrl: './create-game-form.component.html',
  styleUrl: './create-game-form.component.scss'
})
export class CreateGameFormComponent {
  @Output() emitter = new EventEmitter();
  players: number = 0;
  bet: number = 0;

  events(event: string) {
    const message: any = {
      event: `CreateGameFormComponent:${event}`,
    };

    if (event === 'create') {
      message.data = {
        players: this.players,
        bet: this.bet,
      };
    }

    this.emitter.emit(message);
  }
}
