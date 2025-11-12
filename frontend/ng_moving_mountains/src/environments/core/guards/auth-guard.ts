import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth = inject(AuthStore);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
