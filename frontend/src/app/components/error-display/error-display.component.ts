import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AppError, ErrorType } from '../../models/error.model';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit, OnDestroy {
  errors$: Observable<AppError[]>;
  isGlobalErrorVisible$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(private errorHandlerService: ErrorHandlerService) {
    this.errors$ = this.errorHandlerService.errors$;
    this.isGlobalErrorVisible$ = this.errorHandlerService.isGlobalErrorVisible$;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Удаляет конкретную ошибку
   */
  removeError(errorId: string): void {
    this.errorHandlerService.removeError(errorId);
  }

  /**
   * Очищает все ошибки
   */
  clearAllErrors(): void {
    this.errorHandlerService.clearAllErrors();
  }

  /**
   * Получает CSS класс для типа ошибки
   */
  getErrorTypeClass(errorType: ErrorType): string {
    switch (errorType) {
      case ErrorType.HTTP:
        return 'error-http';
      case ErrorType.VALIDATION:
        return 'error-validation';
      case ErrorType.NETWORK:
        return 'error-network';
      case ErrorType.AUTHENTICATION:
        return 'error-auth';
      case ErrorType.AUTHORIZATION:
        return 'error-authorization';
      default:
        return 'error-unknown';
    }
  }

  /**
   * Получает иконку для типа ошибки
   */
  getErrorIcon(errorType: ErrorType): string {
    switch (errorType) {
      case ErrorType.HTTP:
        return '🌐';
      case ErrorType.VALIDATION:
        return '⚠️';
      case ErrorType.NETWORK:
        return '📡';
      case ErrorType.AUTHENTICATION:
        return '🔐';
      case ErrorType.AUTHORIZATION:
        return '🚫';
      default:
        return '❌';
    }
  }

  /**
   * Получает заголовок для типа ошибки
   */
  getErrorTypeTitle(errorType: ErrorType): string {
    switch (errorType) {
      case ErrorType.HTTP:
        return 'HTTP Ошибка';
      case ErrorType.VALIDATION:
        return 'Ошибка валидации';
      case ErrorType.NETWORK:
        return 'Сетевая ошибка';
      case ErrorType.AUTHENTICATION:
        return 'Ошибка авторизации';
      case ErrorType.AUTHORIZATION:
        return 'Ошибка доступа';
      default:
        return 'Неизвестная ошибка';
    }
  }

  /**
   * Форматирует время ошибки
   */
  formatErrorTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  /**
   * TrackBy функция для оптимизации рендеринга списка ошибок
   */
  trackByErrorId(index: number, error: AppError): string {
    return error.id;
  }
}
