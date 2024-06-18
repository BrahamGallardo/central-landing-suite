import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Session } from '../../models/session';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _spinner: NgxSpinnerService = inject(NgxSpinnerService);
  private _toast: ToastService = inject(ToastService);
  private _router: Router = inject(Router);
  private _http: HttpClient = inject(HttpClient);

  private _url: string = environment.apiUrl + '/auth';

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this._spinner.hide();
      switch (error.status) {
        case 400:
          console.log("400: ", error);
          this._toast.showDanger("400: Error");
          break;
        case 401:
          console.log("401: ", error);
          this._router.navigate(['/auth']);
          this._toast.showDanger("401: Your session has expired. Please log in again to continue.");
          break;
        case 404:
          console.log("404: ", error);
          break;
        case 500:
          console.log("500: ", error);
          const message = error.error.Message.slice(0, 36) + '...';
          this._toast.showDanger("500: " + message);
          break;
        default:
          break;

      }
      return of(result as T);
    };
  }

  addSession(email: string, password: string): Observable<Session> {
    this._spinner.show();
    const loginParameters = {
      email: email,
      password: password,
    }
    return this._http.post<Session>(this._url, loginParameters).pipe(
      tap((session: Session) => {
        this._spinner.hide();
        if (!session) return;
        this._toast.showSucces('Welcome');
      }),
      catchError(this.handleError<Session>('addSession'))
    );
  }

  getCurrentAuth(): Session {
    if (localStorage.getItem('session') != null) {
      return JSON.parse(localStorage.getItem('session'));
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentAuth() !== null;
  }

  getUser(): string {
    if (localStorage.getItem('user') != null) {
      return localStorage.getItem('user');
    }
    return null;
  }

  clear(): void {
    this.deleteCurrentAuth();
  }

  deleteCurrentAuth(): void {
    localStorage.clear();
    window.location.reload();
  }

  setCurrentAuth(session: Session) {
    localStorage.setItem('session', JSON.stringify(session));
    localStorage.setItem('user', session.user.email);
    window.location.reload();
  }

}
