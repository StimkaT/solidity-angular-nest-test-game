import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {SelectComponent} from '../select/select.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    SelectComponent
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss'
})
export class PlayerProfileComponent {
  @Input() title = '';
  @Input() address = '';
  @Input() balance: number | null = null;
  @Input() bet: number | null = null;

  @Output() emitter = new EventEmitter();

  change() {
    const message = {
      event: 'PlayerProfileComponent:CHANGE'
    }
    this.emitter.emit(message)
  }
}
