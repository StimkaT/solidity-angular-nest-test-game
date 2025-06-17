import { Component } from '@angular/core';
import {RegistrationFormComponent} from '../../components/registration-form/registration-form.component';
import {LoginFormContainerComponent} from '../login-form-container/login-form-container.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-registration-form-container',
  imports: [
    RegistrationFormComponent,
  ],
  standalone: true,
  templateUrl: './registration-form-container.component.html',
  styleUrl: './registration-form-container.component.scss'
})
export class RegistrationFormContainerComponent {
  constructor(
    public dialogRef: MatDialogRef<RegistrationFormComponent>,
    public dialog: MatDialog
  ) {}

  events($event: any) {
    if ($event.event === 'RegistrationFormComponent:login') {
      this.close();
      this.openLoginModal()
    }
  }

  close() {
    this.dialogRef.close();
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginFormContainerComponent, {
      width: '80%',
      height: '70%',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Модальное окно закрыто');
    });
  }
}
