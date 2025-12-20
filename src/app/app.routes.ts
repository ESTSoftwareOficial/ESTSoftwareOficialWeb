import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/pages/home/landing.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: LandingComponent },
    { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
    { path: 'courses', loadChildren: () => import('./features/courses/courses.routes').then(m => m.COURSES_ROUTES) },
    { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) }
];
