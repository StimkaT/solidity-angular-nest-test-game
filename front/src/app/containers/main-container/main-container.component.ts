import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginFormContainerComponent} from '../login-form-container/login-form-container.component';
import {RegistrationFormContainerComponent} from '../registration-form-container/registration-form-container.component';
import {CardGameComponent} from '../../components/card-game/card-game.component';

@Component({
  selector: 'app-main-container',
  imports: [
    HeaderComponent,
    SidebarComponent,
    CardGameComponent
  ],
  standalone: true,
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {
  constructor(public dialog: MatDialog) {}

  events($event: any) {
    if ($event.event === 'HeaderComponent:login') {
      this.openLoginModal()
    }
    if ($event.event === 'HeaderComponent:registration') {
      this.openRegistrationModal()
    }
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginFormContainerComponent, {
      width: '80%',
      height: '70%',
      hasBackdrop: true,
    });

  }

  openRegistrationModal(): void {
    const dialogRef = this.dialog.open(RegistrationFormContainerComponent, {
      width: '80%',
      height: '70%',
      hasBackdrop: true,
    });

  }
}
