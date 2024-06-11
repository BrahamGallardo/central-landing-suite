import { Injectable, inject } from '@angular/core';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { cloneDeep } from 'lodash-es';
import { ToastBootstrapComponent } from '../../shared/components/toast-bootstrap/toast-bootstrap.component';

type Type = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private options: GlobalConfig;
  private toastr: ToastrService = inject(ToastrService);

  constructor() {
    this.options = {
      autoDismiss: false,
      closeButton: true,
      maxOpened: 2, // Cannon set max Opened
      newestOnTop: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
      extendedTimeOut: 1000,
      ...this.toastr.toastrConfig
    } as GlobalConfig;
  }

  show(type: Type, message: string, title?: string, duration: number = 1500) {
    this.options.timeOut = duration;
    switch (type) {
      case 'success':
        this.options.toastComponent = ToastBootstrapComponent;
        this.toastr.show(message, title, this.options);
        break;
      case 'dark':
        this.toastr.show(message, title, this.options);
        break;
    }
  }
}
