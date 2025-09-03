import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-players-status-table',
  imports: [
    MatIconModule
  ],
  standalone: true,
  templateUrl: './players-status-table.component.html',
  styleUrl: './players-status-table.component.scss'
})
export class PlayersStatusTableComponent {
  @Input() data: any = {};
}
