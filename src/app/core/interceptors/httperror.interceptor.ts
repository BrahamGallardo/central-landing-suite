import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';

export const httperrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
export class HttpErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private toastService: ToastService, 
    private router: Router, 
    private authService: AuthService
    // private sessionService: SessionService, 
    // private spinner: NgxSpinnerService
    ) {}

    private limitMessage(message: string, limit: number,): string {
      
      let newMessage = message.slice(0, limit);
      if (message.length > limit) {
        newMessage += "...";
      }

      return newMessage;
    }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          let errorTitle = '';
        //   this.spinner.hide();

          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Error del lado del servidor
            // errorMessage = `Error Código: ${error.status}\nMensaje: ${error.message}`;
            errorTitle = `Error Code: ${error.status}`;
            switch(error.status) {
              case 404:
                break;
              case 401:

                // this.authService.isAuthenticated().subscribe(res => 
                //   {
                //     if(!res && (typeof error.error) === 'string') {
                //       errorTitle = 'Error';
                //       errorMessage = error.error;
                //     } else {                    
                //       errorMessage = 'Your session has expired. Please log in again to continue.';
                //     }
                //   });
                  
                //   this.authService.logout('email').subscribe(res => {
                //     if (res.isSuccess()) {
                //       setTimeout(() => {
                //         this.router.navigate(['/auth'])
                //       }, 2500);
                //     };
                //   });

                
                break;
              default:
                errorMessage = error.message;

                if (typeof error.error == 'string') {
                  errorMessage = error.error
                } else {
                  errorMessage = error.error.hasOwnProperty('errors') ? 
                  (
                    error.error?.errors?.hasOwnProperty("id") ? error.error?.errors?.id[0] : error.error?.errors?.filters[0]
                  ) :  error.message;
                }
                break;
            }
          }
          
          this.toastService.show('danger', this.limitMessage(errorMessage, 150), errorTitle, 2000);
          return throwError(() => new Error(errorMessage));
        })
      )
  }
}