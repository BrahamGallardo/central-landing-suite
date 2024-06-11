import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhoneMaskDirective } from './shared/directive/phone-mask.directive';
import { PhonePipe } from './shared/pipes/phone.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from './core/services/toast.service';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NgbModule,
    PhoneMaskDirective,
    PhonePipe,
    ReactiveFormsModule,
    ToastComponent
  ],
  //template: `<button (click)="showToast()">Show Toast</button>`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'central-landing-suite';
  private modalService: NgbModal = inject(NgbModal);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  //private _toastService: ToastService = inject(ToastService)

  /**
   *
   */
  constructor(protected _toastService: ToastService) { }

  public formGroup: FormGroup = new FormGroup({
    phoneControl: new FormControl('81')
  });

  public phonePipe: string = "8112345678";

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  showToast(): void {
    this._toastService.show("success", "Hola soy un pan");
  }

  onPhoneNumberChange(val: string) {
    this.formGroup.get("phoneControl").setValue(val);
  }
}
