import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-players-status-table',
  imports: [],
  standalone: true,
  templateUrl: './players-status-table.component.html',
  styleUrl: './players-status-table.component.scss'
})
export class PlayersStatusTableComponent {
  @Input() data: any = {};
}
