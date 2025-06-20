import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent {
  @Input() title: string = '';
  @Input() iconList: string[] = [];

}
