import { Injectable, inject } from '@angular/core';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ToastInterface } from '../../shared/interfaces/toast-interface';

type Type = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  public toasts: ToastInterface[] = [];

  show(type: Type, message: string, title?: string, duration: number = 2000) {
    const toast: ToastInterface = { type, message, title, duration };
    this.toasts.push(toast);
    setTimeout(() => this.remove(toast), duration);
  }

  remove(toast: ToastInterface) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
