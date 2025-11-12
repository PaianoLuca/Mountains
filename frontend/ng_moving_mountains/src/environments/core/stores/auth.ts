import { Injectable, signal, computed } from '@angular/core';
import { AuthService } from '../services/auth';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})

export class AuthStore {
  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  private _user = signal<any | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  token = this._token.asReadonly();
  user = this._user.asReadonly();

  isAuthenticated = computed(() => !!this._token());

  getToken() {
    return this._token();
  }

  register(data: any) {
    return this.auth.register(data);
  }

  login(credentials: any){
    return this.auth.login(credentials).pipe(
      tap((response) => {
        this._token.set(response.token);
        this._user.set(response.user);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  logout() {
    return this.auth.logout().pipe(tap(() => this.clearAuth()));
  }
}
