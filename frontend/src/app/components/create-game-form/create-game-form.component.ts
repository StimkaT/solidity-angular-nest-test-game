import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-game-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule],
  standalone: true,
  templateUrl: './create-game-form.component.html',
  styleUrl: './create-game-form.component.scss'
})
export class CreateGameFormComponent {
  @Output() emitter = new EventEmitter();
  playersNumber = 2;
  bots = 0;
  bet = 100;

  playersValid = true;
  botsValid = true;
  betValid = true;

  validatePlayers() {
    this.playersValid = this.playersNumber >= 1 && this.playersNumber <= 10;
  }

  validateBots() {
    this.botsValid = this.bots >= 0 && this.bots <= 4;
  }

  validateBet() {
    // Check that bet contains only digits and no more than 10 characters
    const betString = this.bet.toString();
    this.betValid = /^\d{1,10}$/.test(betString);
  }

  isFormValid(): boolean {
    return this.playersValid && this.botsValid && this.betValid;
  }

  events(event: string) {
    if (event === 'create' && this.isFormValid()) {
      const message = {
        event: 'CreateGameFormComponent:create',
        data: {
          players: this.playersNumber,
          bots: this.bots,
          bet: Number(this.bet),
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
