import {Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {IGameList} from '../../+state/game-data/game-data.reducer';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent implements OnInit {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  @Input() game: IGameList = {
    iconList: [],
    svgIconList: [],
    title: '',
    linkGame: '',
    readyStatus: false
  };

  ngOnInit() {
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/games-sprite.svg')
    );
  }
}
