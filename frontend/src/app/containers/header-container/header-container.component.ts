import {Component, EventEmitter, inject, Output} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {Store} from '@ngrx/store';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-header-container',
  imports: [
    HeaderComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './header-container.component.html',
  styleUrl: './header-container.component.scss'
})
export class HeaderContainerComponent {
  @Output() emitter = new EventEmitter();

  private store = inject(Store);

  getUserData$ = this.store.select(getPlayer);
}
