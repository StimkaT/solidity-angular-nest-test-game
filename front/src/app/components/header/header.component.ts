import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { RegisterButtonComponent } from '../register-button/register-button.component';
import { SidebarService } from '../../services/sidebar.service';
import {IPlayer} from '../../+state/auth/auth.reducer';
import {LogoutButtonComponent} from '../logout-button/logout-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    LoginButtonComponent,
    RegisterButtonComponent,
    LogoutButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() player: IPlayer | null = null;
  @Output() emitter = new EventEmitter();

  private sidebarService = inject(SidebarService);

  events(event: string) {
    const message = {
      event: `HeaderComponent:${event}`,
    };
    this.emitter.emit(message);
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
