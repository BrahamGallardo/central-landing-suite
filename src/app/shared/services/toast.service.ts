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
  show(type: Type, message: string, title?: string, duration: number = message.length * 100) {
    const toastTypes: { [key in Type]? } = {
      success: ToastType.SUCCESS,
      danger: ToastType.DANGER,
      warning: ToastType.WARNING,
      info: ToastType.INFO,
      primary: ToastType.PRIMARY,
      secondary: ToastType.SECONDARY,
    };

    const toastType = toastTypes[type];

    if (toastType) {
      this._toast.toast(message, toastType, title, duration);
    }
  }

  /**
     * Displays a Success toast message.
     * @param message The message to display.
     * @param title The optional title of the toast message.
     * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
  */
  showSucces(message: string, title?: string, duration: number = message.length * 100) {
    this._toast.toast(message, ToastType.SUCCESS, title, duration);
  }

  /**
     * Displays a Danger toast message.
     * @param message The message to display.
     * @param title The optional title of the toast message.
     * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
  */
  showDanger(message: string, title?: string, duration: number = message.length * 100) {
    this._toast.toast(message, ToastType.DANGER, title, duration);
  }

  /**
     * Displays a Warning toast message.
     * @param message The message to display.
     * @param title The optional title of the toast message.
     * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
  */
  showWarning(message: string, title?: string, duration: number = message.length * 100) {
    this._toast.toast(message, ToastType.WARNING, title, duration);
  }

  /**
     * Displays a Info toast message.
     * @param message The message to display.
     * @param title The optional title of the toast message.
     * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
  */
  showInfo(message: string, title?: string, duration: number = message.length * 100) {
    this._toast.toast(message, ToastType.INFO, title, duration);
  }

}
