import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'my-courses',
        loadComponent: () => import('../users/components/my-courses/my-courses.component').then(m => m.MyCoursesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('../users/components/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'payment-history',
        loadComponent: () => import('../payments/components/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  }
];