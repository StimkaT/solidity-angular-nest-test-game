import {Component, inject} from '@angular/core';
import {CreateGameFormComponent} from '../../components/create-game-form/create-game-form.component';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {createGame} from '../../+state/game-data/game-data.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-game-form-container',
  imports: [
    CreateGameFormComponent,
  ],
  standalone: true,
  templateUrl: './create-game-form-container.component.html',
  styleUrl: './create-game-form-container.component.scss'
})
export class CreateGameFormContainerComponent {
  private dialogRef = inject(MatDialogRef<CreateGameFormContainerComponent>);
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  private gameTitle = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['title']) {
        this.gameTitle = params['title'];
      }
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
