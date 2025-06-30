import { Component, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() list: any = [
    {value: '0.0001', viewValue: '0.0001'},
    {value: '0.0010', viewValue: '0.0010'},
    {value: '0.0100', viewValue: '0.0100'},
    {value: '0.1000', viewValue: '0.1000'},
    {value: '1.0000', viewValue: '1.0000'},
  ];
  @Input() title: string = 'Bet';
  @Input() label: string = 'Place your bet';
}
