import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { RegisterButtonComponent } from '../register-button/register-button.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    LoginButtonComponent,
    RegisterButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() emitter = new EventEmitter()

  constructor(
    public sidebarService: SidebarService
  ) {}

  login() {
    const message = {
      event: 'HeaderComponent:login',
    };
    this.emitter.emit(message);
  }

  registration() {
    const message = {
      event: 'HeaderComponent:registration',
    };
    this.emitter.emit(message);
  }
}
