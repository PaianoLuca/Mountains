import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { AuthGuard } from './core/auth/auth-guard';
import { MountainDetail } from './pages/mountain-details/mountain-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home, canActivate: [AuthGuard] },

    { path: 'mountains/:id', component: MountainDetail, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login'},

];