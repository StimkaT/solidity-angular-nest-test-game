export interface AppError {
  id: string;
  message: string;
  type: ErrorType;
  timestamp: Date;
  details?: any;
  statusCode?: number;
}

export enum ErrorType {
  HTTP = 'HTTP',
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorState {
  errors: AppError[];
  isGlobalErrorVisible: boolean;
}
