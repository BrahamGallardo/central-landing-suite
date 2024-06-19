import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const httpResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
}

//Uncomment when you need to test
export const loggingInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  //console.log('Request URL: ' + req.url);
  return next(req);
}

//Uncomment when you need to test
export const responseTimeInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  return next(req).pipe(
    finalize(() => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      //console.log(`Request to ${ req.url } took ${ responseTime }ms`);
    })
  );
}