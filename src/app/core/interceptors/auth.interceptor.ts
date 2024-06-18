import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { Observable, finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const SHOW_SPINNER_HEADER = 'show-spinner';
  const AUTHORIZATION_HEADER = 'Authorization';

  const _spinner: NgxSpinnerService = inject(NgxSpinnerService);
  const _authService: AuthService = inject(AuthService);

  const showSpinner = req.headers.get(SHOW_SPINNER_HEADER) !== 'false';

  if (showSpinner) {
    _spinner.show();
  }

  let modifiedReq = req.headers.has(SHOW_SPINNER_HEADER)
    ? req.clone({ headers: req.headers.delete(SHOW_SPINNER_HEADER) })
    : req;

  const token = _authService.getCurrentAuth() ? _authService.getCurrentAuth().token : null;
  if (token) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set(AUTHORIZATION_HEADER, `Bearer ${ token }`)
    });
  }
  return next(modifiedReq).pipe(
    finalize(() => _spinner.hide())
  );
};