import {Component, inject} from '@angular/core';
import {LoginFormComponent} from '../../components/login-form/login-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RegistrationFormContainerComponent} from '../registration-form-container/registration-form-container.component';
import {login} from '../../+state/auth/auth.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-login-form-container',
  imports: [
    LoginFormComponent,
    MatButtonModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './login-form-container.component.html',
  styleUrl: './login-form-container.component.scss'
})
export class LoginFormContainerComponent {
  private store = inject(Store);

  constructor(
    public dialogRef: MatDialogRef<LoginFormContainerComponent>,
    public dialog: MatDialog
  ) {}

  events($event: any) {
    if ($event.event === 'LoginFormComponent:registration') {
      this.close();
      this.openRegistrationModal()
    } else if ($event.event === 'LoginFormComponent:login') {
      this.store.dispatch(login({data: $event.data}))
    }
  }

  close() {
    this.dialogRef.close();
  }

  openRegistrationModal(): void {
    const dialogRef = this.dialog.open(RegistrationFormContainerComponent, {
      width: '80%',
      height: '70%',
      hasBackdrop: true,
    });
  }
}
