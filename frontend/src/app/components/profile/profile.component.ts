import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {IPlayer} from '../../+state/auth/auth.reducer';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() user: IPlayer | null = null;
  @Input() balance: string = '';

  @Output() emitter = new EventEmitter()

  reloadBalance() {
    const message = {
      event: 'ProfileComponent:GetBalance',
      data: {
        wallet: this.user?.wallet || ''
      }
    };
    this.emitter.emit(message);
  }

}
