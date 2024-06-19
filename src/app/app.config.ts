import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingSpinnerInterceptor } from './core/interceptors/loading-spinner.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { loggingInterceptorFunctional, responseTimeInterceptorFunctional } from './core/interceptors/http-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([loadingSpinnerInterceptor])),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideHttpClient(withInterceptors([loggingInterceptorFunctional])),
    provideHttpClient(withInterceptors([responseTimeInterceptorFunctional])),
  ]
};
