import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected loginFormGroup: any = FormGroup;
  protected submitted = false;
  private email: string = localStorage.getItem('user');

  private formBuilder: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: [this.email ?? '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
    if (this.email) this.setRememberMe();
  }

  protected get f() { return this.loginFormGroup.controls; }

  protected setRememberMe() {
    this.loginFormGroup.patchValue({ rememberMe: !this.loginFormGroup.controls.rememberMe.value });
  }

  protected async onSubmit() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.login();
  }

  private async login() {
    const email = this.loginFormGroup.value.email;
    const password = this.loginFormGroup.value.password;
    const rememberMe = this.loginFormGroup.value.rememberMe;
    const $obs = this._authService.login(email, password, rememberMe);
    const res = await lastValueFrom($obs);
  }

}