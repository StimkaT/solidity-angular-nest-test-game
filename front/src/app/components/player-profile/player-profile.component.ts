import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss'
})
export class PlayerProfileComponent {
  @Input() title = '';
  @Input() address = '';
  @Input() balance: number | null = null;

  @Output() emitter = new EventEmitter();

}
