import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Toast } from 'ngx-toastr';


@Component({
  selector: '[app-toast-bootstrap]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'toast-bootstrap.component.html'
})
export class ToastBootstrapComponent extends Toast {

}
