import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinner: NgxSpinnerService = inject(NgxSpinnerService);
  _spinner.show();
  return next(req).pipe(
    finalize(() => {
      _spinner.hide();
    })
  );
};