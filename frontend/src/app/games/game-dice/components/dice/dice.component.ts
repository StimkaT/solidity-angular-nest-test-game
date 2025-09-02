import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dice',
  imports: [],
  standalone: true,
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  @Input() isRotate = false;
  @Input() diceValue = 1;
  @Output() emitter = new EventEmitter();

  @ViewChild('dice1') dice1!: ElementRef<HTMLDivElement>;

}
