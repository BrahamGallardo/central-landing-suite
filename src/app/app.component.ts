import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhoneMaskDirective } from './shared/directive/phone-mask.directive';
import { PhonePipe } from './shared/pipes/phone.pipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from './core/services/toast.service';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from './core/services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NgbModule,
    PhoneMaskDirective,
    PhonePipe,
    ReactiveFormsModule,
    NgToastModule,
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  ToasterPosition = ToasterPosition;
  title = 'central-landing-suite';

  private modalService: NgbModal = inject(NgbModal);
  private _toastService: ToastService = inject(ToastService);
  private _authService: AuthService = inject(AuthService);

  public phonePipe: string = "8112345678";
  public user: string = this._authService.getCurrentAuth() ? this._authService.getCurrentAuth().user.email : '';

  public formGroup: FormGroup = new FormGroup({
    phoneControl: new FormControl('81')
  });

  public formLogin: FormGroup = new FormGroup({
    emailControl: new FormControl(localStorage.getItem('user') ? localStorage.getItem('user') : '', Validators.required),
    passwordControl: new FormControl('', Validators.required)
  });

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  showToast(): void {
    this._toastService.showInfo("Hola soy un pan", "Hola");
  }

  onPhoneNumberChange(val: string) {
    this.formGroup.get("phoneControl").setValue(val);
  }

  async login() {
    const $obs = this._authService.login(this.formLogin.get('emailControl').value, this.formLogin.get('passwordControl').value);
    const res = await lastValueFrom($obs);
    if (res) {
      this.user = res.user.email;
    }
  }
  async logout() {
    const $obs = this._authService.logout();
    this.user = null;
  }
}
