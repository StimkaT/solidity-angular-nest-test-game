import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

export const ValidationErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlerService = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Обрабатываем ошибки валидации (обычно 400 статус с массивом ошибок)
      if (error.status === 400 && error.error && Array.isArray(error.error)) {
        errorHandlerService.handleValidationError(error.error);
      } else if (error.status === 400 && error.error && error.error.errors) {
        // Обрабатываем ошибки валидации в формате { errors: [...] }
        errorHandlerService.handleValidationError(error.error.errors);
      } else if (error.status === 422) {
        // Обрабатываем ошибки валидации с кодом 422 (Unprocessable Entity)
        if (error.error && Array.isArray(error.error)) {
          errorHandlerService.handleValidationError(error.error);
        } else if (error.error && error.error.errors) {
          errorHandlerService.handleValidationError(error.error.errors);
        } else {
          errorHandlerService.handleValidationError([{ message: error.error?.message || 'Ошибка валидации' }]);
        }
      }

      // Продолжаем цепочку ошибок
      return throwError(() => error);
    })
  );
};
