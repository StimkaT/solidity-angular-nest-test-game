import { Component } from '@angular/core';
import {MainContainerComponent} from './containers/main-container/main-container.component';
import {ErrorDisplayComponent} from './components/error-display/error-display.component';
import {ErrorHandlerService} from './services/error-handler.service';
import {ErrorType} from './models/error.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainContainerComponent, ErrorDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private errorHandlerService: ErrorHandlerService) {}

  // Тестовые методы для демонстрации ошибок
  testHttpError() {
    this.errorHandlerService.handleHttpError({
      status: 404,
      error: { message: 'Пользователь не найден' }
    });
  }

  testValidationError() {
    this.errorHandlerService.handleValidationError([
      { message: 'Поле "Имя" обязательно для заполнения' },
      { message: 'Email должен быть корректным' }
    ]);
  }

  testNetworkError() {
    this.errorHandlerService.handleNetworkError({
      message: 'Failed to fetch',
      code: 'NETWORK_ERROR'
    });
  }

  testAuthError() {
    this.errorHandlerService.handleHttpError({
      status: 401,
      error: { message: 'Токен авторизации истек' }
    });
  }

  testCustomError() {
    this.errorHandlerService.addError({
      message: 'Произошла кастомная ошибка с дополнительными деталями',
      type: ErrorType.UNKNOWN,
      details: {
        userId: 123,
        action: 'saveProfile',
        timestamp: new Date().toISOString()
      }
    });
  }
}
