import { Injectable, inject } from '@angular/core';
import { NgToastService, ToastType } from 'ng-angular-popup';

type Type = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _toast = inject(NgToastService);

  /**
     * Displays a toast message.
     * @param type The type of the toast message.   
     * @param message The message to display.
     * @param title The optional title of the toast message.
     * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
     */
  show(type: Type, message: string, title?: string, duration: number = 1500) {
    switch (type) {
      case "success":
        this._toast.toast(message, ToastType.SUCCESS, title, duration);
        break;
      case "danger":
        this._toast.toast(message, ToastType.DANGER, title, duration);
        break;
      case "warning":
        this._toast.toast(message, ToastType.WARNING, title, duration);
        break;
      case "info":
        this._toast.toast("Hola soy un pan", ToastType.INFO, "Title", duration);
        break;
      case "primary":
        this._toast.toast("Hola soy un pan", ToastType.PRIMARY, "Title", duration);
        break;
      case "secondary":
        this._toast.toast("Hola soy un pan", ToastType.SECONDARY, "Title", duration);
        break;
      default:
        break;
    }

  }
}
