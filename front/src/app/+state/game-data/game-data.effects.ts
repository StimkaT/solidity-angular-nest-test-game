import { Injectable, inject } from '@angular/core';

@Injectable()
export class GameDataEffects {
  // private actions$ = inject(Actions);
  // private moviesService = inject(MoviesService);

  // loadMovies$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType('[Movies Page] Load Movies'),
  //     exhaustMap(() => this.moviesService.getAll()
  //       .pipe(
  //         map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //         catchError(() => EMPTY)
  //       ))
  //   );
  // });
}
