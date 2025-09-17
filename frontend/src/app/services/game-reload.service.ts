import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameReloadService {
  private stop$ = new Subject<void>();

  startReload(callback: (gameType: string) => void, gameType: string, ms: number = 3000) {
    this.stopReload();
    interval(ms)
      .pipe(takeUntil(this.stop$))
      .subscribe(() => {
        callback(gameType);
      });
  }

  stopReload() {
    this.stop$.next();
  }
}
