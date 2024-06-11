import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ToastInterface } from '../../interfaces/toast-interface';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  protected toastService: ToastService = inject(ToastService);
  /**
   *
   */
  //constructor(protected toastService: ToastService) { }
  removeToast(toast: ToastInterface) {
    this.toastService.remove(toast);
  }

  trackByFn(index: number, item: ToastInterface) {
    return index; // or item.id if each toast has a unique id
  }
  // @ViewChild('liveToast', { static: true }) liveToast!: ElementRef;

  // showToast() {
  //   const toastBootstrap = Toast.getOrCreateInstance(this.liveToast.nativeElement);
  //   toastBootstrap.show();
  // }
}
