type Type = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export interface ToastInterface {
  title?: string;
  message: string;
  duration?: number;
  type?: Type;
}