import {Component, Input} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rounds-statistics',
  imports: [AsyncPipe, MatIconModule],
  standalone: true,
  templateUrl: './rounds-statistics.component.html',
  styleUrl: './rounds-statistics.component.scss',
})
export class RoundsStatisticsComponent {
  @Input() roundsViewData: any;
}
