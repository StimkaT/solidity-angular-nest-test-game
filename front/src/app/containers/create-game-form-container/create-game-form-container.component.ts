import { Component } from '@angular/core';
import {CreateGameFormComponent} from '../../components/create-game-form/create-game-form.component';

@Component({
  selector: 'app-create-game-form-container',
  imports: [
    CreateGameFormComponent
  ],
  standalone: true,
  templateUrl: './create-game-form-container.component.html',
  styleUrl: './create-game-form-container.component.scss'
})
export class CreateGameFormContainerComponent {

}
