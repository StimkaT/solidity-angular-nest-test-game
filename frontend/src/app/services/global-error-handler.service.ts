import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ErrorType } from '../models/error.model';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private errorHandlerService = inject(ErrorHandlerService);

  handleError(error: any): void {
    console.error('Глобальная ошибка:', error);

    // Обрабатываем разные типы ошибок
    if (error instanceof TypeError) {
      this.errorHandlerService.addError({
        message: `Ошибка типа: ${error.message}`,
        type: ErrorType.UNKNOWN,
        details: {
          name: error.name,
          stack: error.stack,
          type: 'TypeError'
        }
      });
    } else if (error instanceof ReferenceError) {
      this.errorHandlerService.addError({
        message: `Ошибка ссылки: ${error.message}`,
        type: ErrorType.UNKNOWN,
        details: {
          name: error.name,
          stack: error.stack,
          type: 'ReferenceError'
        }
      });
    } else if (error instanceof SyntaxError) {
      this.errorHandlerService.addError({
        message: `Синтаксическая ошибка: ${error.message}`,
        type: ErrorType.UNKNOWN,
        details: {
          name: error.name,
          stack: error.stack,
          type: 'SyntaxError'
        }
      });
    } else if (error.name === 'ChunkLoadError') {
      // Обрабатываем ошибки загрузки чанков (обычно при обновлении приложения)
      this.errorHandlerService.addError({
        message: 'Ошибка загрузки модуля. Пожалуйста, обновите страницу.',
        type: ErrorType.NETWORK,
        details: {
          name: error.name,
          message: error.message,
          type: 'ChunkLoadError'
        }
      });
    } else if (error.message && error.message.includes('Loading chunk')) {
      // Альтернативная обработка ошибок загрузки чанков
      this.errorHandlerService.addError({
        message: 'Ошибка загрузки модуля. Пожалуйста, обновите страницу.',
        type: ErrorType.NETWORK,
        details: error
      });
    } else {
      // Общая обработка всех остальных ошибок
      this.errorHandlerService.addError({
        message: error.message || 'Произошла неизвестная ошибка',
        type: ErrorType.UNKNOWN,
        details: {
          name: error.name,
          stack: error.stack,
          originalError: error
        }
      });
    }
  }
}
