import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {Router} from '@angular/router';

@Component({
  selector: 'app-active-game-list',
  standalone: true,
  imports: [
    MatButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './active-game-list.component.html',
  styleUrl: './active-game-list.component.scss'
})
export class ActiveGameListComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() activeGamesList: any;
  @Input() player: any;

  @Output() emitter = new EventEmitter();

  private router = inject(Router);


  openCreateGameModal() {
    const message = {
      event: 'ActiveGameListComponent:create'
    }
    this.emitter.emit(message)
  }

  joinGame(gameId: string, title: string) {
    const message = {
      event: 'ActiveGameListComponent:join',
      wallet: this.player.wallet,
      gameId: gameId,
      title
    }
    this.emitter.emit(message)
  }

  reload(title: string) {
    console.log(title)
    const message = {
      event: 'ActiveGameListComponent:reload',
      game: title,
    }
    this.emitter.emit(message)
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
