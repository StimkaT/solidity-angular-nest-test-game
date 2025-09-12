import {Component, Input} from '@angular/core';
import {RoundsStatisticsComponent} from '../rounds-statistics/rounds-statistics.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-statistic-button',
  imports: [
    RoundsStatisticsComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './statistic-button.component.html',
  styleUrl: './statistic-button.component.scss'
})
export class StatisticButtonComponent {
  @Input() roundsViewData: any;
}
