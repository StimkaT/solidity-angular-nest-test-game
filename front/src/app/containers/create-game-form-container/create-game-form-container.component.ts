import {Component, inject} from '@angular/core';
import {CreateGameFormComponent} from '../../components/create-game-form/create-game-form.component';
import {RegistrationFormComponent} from '../../components/registration-form/registration-form.component';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-create-game-form-container',
  imports: [
    CreateGameFormComponent,
    RegistrationFormComponent
  ],
  standalone: true,
  templateUrl: './create-game-form-container.component.html',
  styleUrl: './create-game-form-container.component.scss'
})
export class CreateGameFormContainerComponent {
  private dialogRef = inject(MatDialogRef<CreateGameFormContainerComponent>);

  events(event: any) {
    if (event.event === "CreateGameFormComponent:cancel") {
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
