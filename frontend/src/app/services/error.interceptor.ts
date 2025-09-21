import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlerService = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Обрабатываем только HTTP ошибки (не обрабатываем ошибки с кодом 0, которые обычно связаны с CORS или сетью)
      if (error.status !== 0) {
        errorHandlerService.handleHttpError(error);
      } else {
        // Для ошибок с кодом 0 (обычно сетевые ошибки) используем специальный обработчик
        errorHandlerService.handleNetworkError(error);
      }

      // Продолжаем цепочку ошибок, чтобы другие обработчики тоже могли их обработать
      return throwError(() => error);
    })
  );
};
