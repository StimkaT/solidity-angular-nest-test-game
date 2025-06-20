import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logout-button',
  imports: [],
  standalone: true,
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent {
  @Input() label: string = '';

}
