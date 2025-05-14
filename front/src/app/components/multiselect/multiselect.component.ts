import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-multiselect',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss'
})
export class MultiselectComponent implements OnInit {
  @Input() toppingList: any = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  // @Input() toppings: any;
  toppings = new FormControl('');

  ngOnInit() {
    this.toppings.valueChanges.subscribe(selected => {
      console.log('Выбранные toppings:', selected);
    });
  }

  clickEv() {
    console.log('Выбранные toppings:', this.toppings.value);
  }
}
