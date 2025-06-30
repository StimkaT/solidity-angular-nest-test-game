import {Component, EventEmitter, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {RegisterButtonComponent} from '../register-button/register-button.component';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, RegisterButtonComponent],
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Output() emitter = new EventEmitter()

  login: string = '';
  password: string = '';

  onLogin() {
    const message = {
      event: 'LoginFormComponent:login',
      data: {
        login: this.login,
        password: this.password
      }
    };
    this.emitter.emit(message);
  }

  registration() {
    const message = {
      event: 'LoginFormComponent:registration',
    };
    this.emitter.emit(message);
  }

  checkPass() {
    const message = {
      event: 'LoginFormComponent:checkPass',
      data: {
        login: this.login,
      }
    };
    this.emitter.emit(message);
  }
}
