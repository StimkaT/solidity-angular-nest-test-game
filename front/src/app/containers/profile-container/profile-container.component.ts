import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ProfileComponent} from '../../components/profile/profile.component';
import {Store} from '@ngrx/store';
import {getUserData} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-profile-container',
  imports: [
    ProfileComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.scss'
})
export class ProfileContainerComponent {
  private store = inject(Store);

  @Output() emitter = new EventEmitter();

  getUserData$ = this.store.select(getUserData);
}
