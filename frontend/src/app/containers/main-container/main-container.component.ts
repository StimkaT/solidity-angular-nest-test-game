import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginFormContainerComponent} from '../login-form-container/login-form-container.component';
import {RegistrationFormContainerComponent} from '../registration-form-container/registration-form-container.component';
import {HeaderContainerComponent} from '../header-container/header-container.component';
import {ErrorDisplayComponent} from '../../components/error-display/error-display.component';
import {Store} from '@ngrx/store';
import {getSidebarValue, getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {checkAuth, logout} from '../../+state/auth/auth.actions';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-container',
  imports: [
    SidebarComponent,
    HeaderContainerComponent,
    ErrorDisplayComponent,
    AsyncPipe,
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent implements OnInit {
  @Output() emitter = new EventEmitter();

  private store = inject(Store);
  private dialog = inject(MatDialog);

  getUserData$ = this.store.select(getPlayer);
  getSidebarValue$ = this.store.select(getSidebarValue);

  ngOnInit() {
    this.store.dispatch(checkAuth())
  }

  openLoginModal(): void {
    this.dialog.open(LoginFormContainerComponent, {
      width: '80%',
      height: '70%',
      hasBackdrop: true,
    });
  }

  openRegistrationModal(): void {
    this.dialog.open(RegistrationFormContainerComponent, {
      width: '80%',
      height: '70%',
      hasBackdrop: true,
    });
  }

  events($event: any) {
    if ($event.event === 'HeaderComponent:login') {
      this.openLoginModal()
    } else if ($event.event === 'HeaderComponent:registration') {
      this.openRegistrationModal()
    } else if ($event.event === 'HeaderComponent:logout') {
      this.store.dispatch(logout())
    }
  }
}
