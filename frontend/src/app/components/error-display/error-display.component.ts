import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AppError, ErrorType } from '../../models/error.model';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
  animations: [
    trigger('slideInFromBottom', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ErrorDisplayComponent implements OnInit, OnDestroy {
  visibleErrors: AppError[] = [];
  private destroy$ = new Subject<void>();
  private autoCloseTimers = new Map<string, any>();

  constructor(private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    // Подписываемся на изменения ошибок
    this.errorHandlerService.errors$
      .pipe(takeUntil(this.destroy$))
      .subscribe(errors => {
        this.updateVisibleErrors(errors);
      });
  }

  ngOnDestroy(): void {
    // Очищаем все таймеры
    this.autoCloseTimers.forEach(timer => clearTimeout(timer));
    this.autoCloseTimers.clear();

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Обновляет список видимых ошибок и настраивает автозакрытие
   */
  private updateVisibleErrors(errors: AppError[]): void {
    // Добавляем новые ошибки
    const newErrors = errors.filter(error =>
      !this.visibleErrors.some(visibleError => visibleError.id === error.id)
    );

    newErrors.forEach(error => {
      this.visibleErrors.push(error);
      this.setupAutoClose(error.id);
    });

    // Удаляем ошибки, которых больше нет в общем списке
    this.visibleErrors = this.visibleErrors.filter(visibleError =>
      errors.some(error => error.id === visibleError.id)
    );
  }

  /**
   * Настраивает автозакрытие ошибки через 5 секунд
   */
  private setupAutoClose(errorId: string): void {
    const timer = setTimeout(() => {
      this.removeError(errorId);
    }, 5000);

    this.autoCloseTimers.set(errorId, timer);
  }

  /**
   * Удаляет конкретную ошибку
   */
  removeError(errorId: string): void {
    // Очищаем таймер автозакрытия
    const timer = this.autoCloseTimers.get(errorId);
    if (timer) {
      clearTimeout(timer);
      this.autoCloseTimers.delete(errorId);
    }

    // Удаляем из видимых ошибок
    this.visibleErrors = this.visibleErrors.filter(error => error.id !== errorId);

    // Удаляем из сервиса
    this.errorHandlerService.removeError(errorId);
  }

  /**
   * Очищает все ошибки
   */
  clearAllErrors(): void {
    // Очищаем все таймеры
    this.autoCloseTimers.forEach(timer => clearTimeout(timer));
    this.autoCloseTimers.clear();

    // Очищаем видимые ошибки
    this.visibleErrors = [];

    // Очищаем в сервисе
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
