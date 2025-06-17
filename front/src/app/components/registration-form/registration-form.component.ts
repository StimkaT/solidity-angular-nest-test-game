import {Component, EventEmitter, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {RegisterButtonComponent} from '../register-button/register-button.component';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-registration-form',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, RegisterButtonComponent
  ],
  standalone: true,
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  @Output() emitter = new EventEmitter()

  login: string = '';
  password: string = '';

  onRegistration() {
    const message = {
      event: 'RegistrationFormComponent:addAccount',
      data: {
        login: this.login,
        password: this.password
      }
    };
    this.emitter.emit(message);
  }

  loginForm() {
    const message = {
      event: 'RegistrationFormComponent:login',
    };
    this.emitter.emit(message);
  }

}
