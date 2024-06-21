import { Component, inject } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterPosition } from 'ng-angular-popup';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { PhoneMaskDirective } from '../../../shared/directive/phone-mask.directive';
import { PhonePipe } from '../../../shared/pipes/phone.pipe';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterOutlet,
    NgbModule,
    ReactiveFormsModule,
    PhoneMaskDirective,
    PhonePipe
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
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
