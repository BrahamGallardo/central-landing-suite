import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinner: NgxSpinnerService = inject(NgxSpinnerService);
  const _authService: AuthService = inject(AuthService);
  const _toastService: ToastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      _spinner.hide();
      let errorTitle = '';
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${ error.error.message }`;
      }
      if (error instanceof HttpErrorResponse) {
        errorTitle = `Error Code: ${ error.status }`;
        switch (error.status) {
          case 400:
            errorMessage = `Bad Request ${ JSON.stringify(error.error.errors) }`;
            break;
          case 401:
            if (!_authService.isAuthenticated() && (typeof error.error) === 'string') {
              errorMessage = error.error;
            } else {
              errorMessage = 'Your session has expired. Please log in again to continue.';
            }
            setTimeout(() => {
              _authService.logout();
            }, 2000);
            break;
          case 403:
            errorMessage = `Forbidden ${ error.message }`;
            break;
          case 404:
            errorMessage = `Not Found ${ error.message }`;
            break;
          case 500:
            errorMessage = `Server Error ${ error.error.Message }`;
            break;
          default:
            console.log(`Unexpected status code: ${ error.status }`, error);
            if (typeof error.error == 'string') {
              errorMessage = error.error
            } else {
              errorMessage = error.error.hasOwnProperty('errors') ?
                (
                  error.error?.errors?.hasOwnProperty("id") ? error.error?.errors?.id[0] : error.error?.errors?.filters[0]
                ) : error.message;
            }
            break;
        }
      }
      _toastService.show('danger', limitMessage(errorMessage, 150), errorTitle, 2000);
      return throwError(() => error);
    })
  );
};

function limitMessage(message: string, limit: number,): string {
  let newMessage = message.slice(0, limit);
  if (message.length > limit) {
    newMessage += "...";
  }
  return newMessage;
}