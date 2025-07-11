import {Component, inject, OnInit} from '@angular/core';
import {CreateGameFormComponent} from '../../components/create-game-form/create-game-form.component';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {createGame, getActiveGames} from '../../+state/game-data/game-data.actions';
import {ActivatedRoute} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';

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
  private route = inject(ActivatedRoute);
  private actions$ = inject(Actions);

  private gameTitle = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['title']) {
        this.gameTitle = params['title'];
      }
    });
    this.actions$.pipe(
      ofType(getActiveGames)
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  events(event: any) {
    if (event.event === "CreateGameFormComponent:cancel") {
      this.close();
    } else if (event.event === "CreateGameFormComponent:create") {
      this.store.dispatch(createGame({
        typeGame: this.gameTitle,
        playersNumber: event.data.players,
        bet: event.data.bet,
      }));
    }
  }
}
