import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService: AuthService = inject(AuthService);

  const token = _authService.getCurrentAuth() ? _authService.getCurrentAuth().token : null;
  if (token) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });
    return next(authRequest);
  } else {
    return next(req);
  }
};
