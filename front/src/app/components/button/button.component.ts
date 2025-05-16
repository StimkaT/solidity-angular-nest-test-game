import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonLabel: string = '';

  @Output() emitter = new EventEmitter();

  action($event: any) {
    const message = {
      event: 'ButtonComponent:CLICK',
      data: $event
    }
    this.emitter.emit(message)
  }
}

