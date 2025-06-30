import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.scss']
})
export class RegisterButtonComponent {
  @Input() label: string = '';
}
