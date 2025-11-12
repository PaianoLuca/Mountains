import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

export interface LoginResponse {
  token: string;
  user?: any;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private api: Api) {}

  register(data: any) {
    return this.api.post('user/register', data);
  }

  login(credentials: { email: string; password: string}): Observable<LoginResponse> {
    return this.api.post('user/login', credentials);
  }

  logout() {
    return this.api.post('user/logout');
  }

  me() {
    return this.api.get('user');
  }
}
