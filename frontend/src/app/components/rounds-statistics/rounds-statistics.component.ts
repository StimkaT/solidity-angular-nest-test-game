import {Component, Input} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rounds-statistics',
  imports: [MatIconModule],
  standalone: true,
  templateUrl: './rounds-statistics.component.html',
  styleUrl: './rounds-statistics.component.scss',
})
export class RoundsStatisticsComponent {
  @Input() roundsViewData: any;
}
