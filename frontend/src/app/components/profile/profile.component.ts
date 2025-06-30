import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {IPlayer} from '../../+state/auth/auth.reducer';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatButtonModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() user: IPlayer | null = null;
  @Input() balance: string = '';

}
