import {Component, EventEmitter, Output} from '@angular/core';
import {DiceComponent} from './components/dice/dice.component';

@Component({
  selector: 'app-game-dice',
  imports: [
    DiceComponent
  ],
  standalone: true,
  templateUrl: './game-dice.component.html',
  styleUrl: './game-dice.component.scss'
})
export class GameDiceComponent {
  @Output() emitter = new EventEmitter();

  isRotate = false;
  dice1Value = 1;
  dice2Value = 1;

  roll() {
    this.dice1Value = Math.floor((Math.random() * 6) + 1);
    this.dice2Value = Math.floor((Math.random() * 6) + 1);
  }




}
