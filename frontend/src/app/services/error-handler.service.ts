import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppError, ErrorType } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorsSubject = new BehaviorSubject<AppError[]>([]);
  private isGlobalErrorVisibleSubject = new BehaviorSubject<boolean>(false);
  
  public errors$ = this.errorsSubject.asObservable();
  public isGlobalErrorVisible$ = this.isGlobalErrorVisibleSubject.asObservable();

  constructor() {}

  /**
   * Добавляет новую ошибку в список
   */
  addError(error: Partial<AppError>): void {
    const newError: AppError = {
      id: this.generateErrorId(),
      message: error.message || 'Произошла неизвестная ошибка',
      type: error.type || ErrorType.UNKNOWN,
      timestamp: new Date(),
      details: error.details,
      statusCode: error.statusCode
    };

    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, newError]);

    // Показываем глобальное уведомление об ошибке
    this.showGlobalError();
  }

  /**
   * Удаляет ошибку по ID
   */
  removeError(errorId: string): void {
    const currentErrors = this.errorsSubject.value;
    const filteredErrors = currentErrors.filter(error => error.id !== errorId);
    this.errorsSubject.next(filteredErrors);

    // Скрываем глобальное уведомление, если нет ошибок
    if (filteredErrors.length === 0) {
      this.hideGlobalError();
    }
  }

  /**
   * Очищает все ошибки
   */
  clearAllErrors(): void {
    this.errorsSubject.next([]);
    this.hideGlobalError();
  }

  /**
   * Обрабатывает HTTP ошибки
   */
  handleHttpError(error: any): void {
    let message = 'Произошла ошибка при выполнении запроса';
    let type = ErrorType.HTTP;
    let statusCode: number | undefined;

    if (error.error) {
      if (typeof error.error === 'string') {
        message = error.error;
      } else if (error.error.message) {
        message = error.error.message;
      } else if (error.error.error) {
        message = error.error.error;
      }
    } else if (error.message) {
      message = error.message;
    }

    if (error.status) {
      statusCode = error.status;
      
      switch (error.status) {
        case 400:
          message = 'Некорректный запрос';
          type = ErrorType.VALIDATION;
          break;
        case 401:
          message = 'Необходима авторизация';
          type = ErrorType.AUTHENTICATION;
          break;
        case 403:
          message = 'Доступ запрещен';
          type = ErrorType.AUTHORIZATION;
          break;
        case 404:
          message = 'Ресурс не найден';
          break;
        case 500:
          message = 'Внутренняя ошибка сервера';
          break;
        default:
          if (error.status >= 500) {
            message = 'Ошибка сервера';
          } else if (error.status >= 400) {
            message = 'Ошибка клиента';
          }
      }
    }

    this.addError({
      message,
      type,
      statusCode,
      details: error
    });
  }

  /**
   * Обрабатывает ошибки валидации
   */
  handleValidationError(errors: any): void {
    if (Array.isArray(errors)) {
      errors.forEach(error => {
        this.addError({
          message: error.message || 'Ошибка валидации',
          type: ErrorType.VALIDATION,
          details: error
        });
      });
    } else {
      this.addError({
        message: errors.message || 'Ошибка валидации',
        type: ErrorType.VALIDATION,
        details: errors
      });
    }
  }

  /**
   * Обрабатывает сетевые ошибки
   */
  handleNetworkError(error: any): void {
    this.addError({
      message: 'Ошибка сети. Проверьте подключение к интернету',
      type: ErrorType.NETWORK,
      details: error
    });
  }

  /**
   * Показывает глобальное уведомление об ошибке
   */
  private showGlobalError(): void {
    this.isGlobalErrorVisibleSubject.next(true);
  }

  /**
   * Скрывает глобальное уведомление об ошибке
   */
  private hideGlobalError(): void {
    this.isGlobalErrorVisibleSubject.next(false);
  }

  /**
   * Генерирует уникальный ID для ошибки
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Получает текущий список ошибок
   */
  getCurrentErrors(): AppError[] {
    return this.errorsSubject.value;
  }

  /**
   * Проверяет, есть ли ошибки
   */
  hasErrors(): boolean {
    return this.errorsSubject.value.length > 0;
  }
}
