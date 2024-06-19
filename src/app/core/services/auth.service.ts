import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Session } from '../../models/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'user';
  private readonly SESSION_KEY = 'session';
  private _http: HttpClient = inject(HttpClient);

  private _url: string = environment.apiUrl + '/Auth';

  login(email: string, password: string, rememberMe: boolean = false): Observable<Session> {
    const loginParameters = {
      email: email,
      password: password,
    }
    return this._http.post<Session>(this._url, loginParameters).pipe(
      tap({
        next: response => {
          this.setCurrentAuth(response, rememberMe);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.getCurrentAuth() !== null;
  }

  getCurrentAuth(): Session {
    if (localStorage.getItem(this.SESSION_KEY) != null) {
      return JSON.parse(localStorage.getItem(this.SESSION_KEY));
    }
    return null;
  }

  logout(): void {
    this.deleteCurrentAuth();
  }

  private deleteCurrentAuth(): void {
    if (localStorage.getItem(this.USER_KEY)) localStorage.removeItem(this.SESSION_KEY);
    else localStorage.clear();
    window.location.reload();
  }

  private setCurrentAuth(session: Session, rememberMe: boolean = false) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    if (rememberMe) localStorage.setItem(this.USER_KEY, session.user.email);
    window.location.reload();
  }

}
