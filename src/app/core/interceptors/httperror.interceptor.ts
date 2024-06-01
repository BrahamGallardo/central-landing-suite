import { HttpInterceptorFn } from '@angular/common/http';

export const httperrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
