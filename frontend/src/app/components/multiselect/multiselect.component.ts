import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-multiselect',
  standalone: true,
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
  @Input() toppingList: any;
  @Input() selectedToppings: any;

  @Output() emitter = new EventEmitter();

  toppings = new FormControl('');

  ngOnInit() {
    this.toppings.setValue(this.selectedToppings);
    this.toppings.valueChanges.subscribe(selected => {
      const message = {
        event: 'MultiselectComponent:CHANGE',
        data: selected
      }
      this.emitter.emit(message);
    });
  }

}
