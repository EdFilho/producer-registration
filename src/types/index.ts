export * from './producer';

// Interfaces de resposta da API
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
