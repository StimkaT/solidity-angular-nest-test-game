import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class MultiselectComponent implements OnInit, OnChanges{
  @Input() toppingList: any = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  @Input() selectedToppings: any =  ['Extra cheese',];

  @Output() emitter = new EventEmitter();

  toppings = new FormControl('');

  ngOnInit() {
    this.toppings.setValue(this.selectedToppings);

    this.toppings.valueChanges.subscribe(selected => {
      this.emitter.emit(selected);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedToppings']) {
      this.toppings.setValue(this.selectedToppings);
    }
  }
}
