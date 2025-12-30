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
        title: 'Inicio',
        loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'my-courses',
        title: 'Cursos',
        loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent)
      },
      {
        path: 'profile',
        title: 'Perfil',
        loadComponent: () => import('../users/components/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'payment-history',
        title: 'Pagos',
        loadComponent: () => import('../payments/components/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent)
      },
      {
        path: 'settings',
        title: 'Configuración',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'courses/:name', 
        loadComponent: () => import('./pages/course-detail/course-detail.component').then(m => m.CourseDetailComponent) 
      },
      {
        path: 'courses/:courseName/lesson/:lessonId',
        loadComponent: () => import('./pages/lesson/lesson.component').then(m => m.LessonComponent)
      }
    ]
  }
];