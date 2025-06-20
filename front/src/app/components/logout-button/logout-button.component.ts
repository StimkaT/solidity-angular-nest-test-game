import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-logout-button',
  imports: [
    MatIcon
  ],
  standalone: true,
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent {
  @Input() label: string = '';

}
