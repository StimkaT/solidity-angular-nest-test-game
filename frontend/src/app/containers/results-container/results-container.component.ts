import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-results-container',
    imports: [],
  standalone: true,
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.scss'
})
export class ResultsContainerComponent {
  private store = inject(Store);
  result: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ResultsContainerComponent>,
    public dialog: MatDialog
  ) {}

  close() {
    this.dialogRef.close();
  }

}
