import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-winner',
  imports: [],
  standalone: true,
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.scss'
})
export class WinnerComponent {
  @Input() name: string = '';
}
