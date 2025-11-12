import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public user = signal<User | null>(null);

  public token = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      this.token.set(savedToken);
      this.user.set(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/user/login`, { email, password }).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.token.set(response.data.token);
          this.user.set(response.data.user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          alert('Login successful');
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error(error);
        alert('Login failed, please check your credentials');
      }
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/user/register`, { name, email, password }).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          alert('Registration successful');
          this.login(email, password);
        }
      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration failed, please try again');
      }
    });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token.set(null);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!this.token();
  }
}