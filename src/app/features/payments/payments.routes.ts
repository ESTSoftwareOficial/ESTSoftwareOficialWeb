import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./components/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent)
  }
];