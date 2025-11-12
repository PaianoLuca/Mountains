import { Injectable, inject } from '@angular/core';
import { 
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import { Auth } from './auth';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const auth = inject(Auth);
  const token = auth.token() || localStorage.getItem('token');
  
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return next(cloned);
  }
  return next(req);
};
