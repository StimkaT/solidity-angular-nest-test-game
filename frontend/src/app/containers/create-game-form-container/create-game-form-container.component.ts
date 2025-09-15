import {Component, Inject, inject, OnInit} from '@angular/core';
import {CreateGameFormComponent} from '../../components/create-game-form/create-game-form.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {createGame} from '../../+state/game-data/game-data.actions';

@Component({
  selector: 'app-create-game-form-container',
  imports: [
    CreateGameFormComponent,
  ],
  standalone: true,
  templateUrl: './create-game-form-container.component.html',
  styleUrl: './create-game-form-container.component.scss'
})
export class CreateGameFormContainerComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateGameFormContainerComponent>);
  private store = inject(Store);

  private gameType = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { gameType: string }) {}

  ngOnInit() {
    this.gameType = this.data.gameType;
  }

  close() {
    this.dialogRef.close();
  }

  events(event: any) {
    if (event.event === "CreateGameFormComponent:cancel") {
      this.close();
    } else if (event.event === "CreateGameFormComponent:create") {
      this.store.dispatch(createGame({
        typeGame: this.gameType,
        playersNumber: event.data.players,
        bots: event.data.bots,
        bet: event.data.bet,
      }));
      this.close();
    }
  }
}
