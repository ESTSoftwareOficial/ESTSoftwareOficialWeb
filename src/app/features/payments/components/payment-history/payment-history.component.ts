import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, CreditCard, Calendar, Download, Filter, Search, ChevronDown, Check, X, Clock } from 'lucide-angular';

interface Payment {
  id: string;
  date: Date;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  description: string;
  invoice?: string;
}

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent {
  readonly CreditCard = CreditCard;
  readonly Calendar = Calendar;
  readonly Download = Download;
  readonly Filter = Filter;
  readonly Search = Search;
  readonly ChevronDown = ChevronDown;
  readonly Check = Check;
  readonly X = X;
  readonly Clock = Clock;

  searchTerm = '';
  selectedFilter = 'all';
  showFilterDropdown = false;

  filterOptions = [
    { value: 'all', label: 'Todos los pagos' },
    { value: 'completed', label: 'Completados' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'failed', label: 'Fallidos' }
  ];

  payments: Payment[] = [
    {
      id: 'PAY-001',
      date: new Date('2025-01-08'),
      amount: 1299.00,
      status: 'completed',
      method: 'Visa •••• 4242',
      description: 'Suscripción mensual - Plan Pro',
      invoice: 'INV-2025-001.pdf'
    },
    {
      id: 'PAY-002',
      date: new Date('2025-01-05'),
      amount: 499.00,
      status: 'completed',
      method: 'Mastercard •••• 8888',
      description: 'Créditos adicionales',
      invoice: 'INV-2025-002.pdf'
    },
    {
      id: 'PAY-003',
      date: new Date('2024-12-08'),
      amount: 1299.00,
      status: 'completed',
      method: 'Visa •••• 4242',
      description: 'Suscripción mensual - Plan Pro',
      invoice: 'INV-2024-012.pdf'
    },
    {
      id: 'PAY-004',
      date: new Date('2024-12-01'),
      amount: 299.00,
      status: 'pending',
      method: 'PayPal',
      description: 'Recarga de créditos'
    },
    {
      id: 'PAY-005',
      date: new Date('2024-11-08'),
      amount: 1299.00,
      status: 'completed',
      method: 'Visa •••• 4242',
      description: 'Suscripción mensual - Plan Pro',
      invoice: 'INV-2024-011.pdf'
    },
    {
      id: 'PAY-006',
      date: new Date('2024-11-02'),
      amount: 799.00,
      status: 'failed',
      method: 'Mastercard •••• 1234',
      description: 'Actualización de plan'
    }
  ];

  get filteredPayments() {
    let filtered = this.payments;

    // Filtrar por estado
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(p => p.status === this.selectedFilter);
    }

    // Filtrar por búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.id.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.method.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  get totalAmount() {
    return this.filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  selectFilter(value: string) {
    this.selectedFilter = value;
    this.showFilterDropdown = false;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      completed: 'Completado',
      pending: 'Pendiente',
      failed: 'Fallido'
    };
    return labels[status] || status;
  }

  getStatusIcon(status: string) {
    const icons: { [key: string]: any } = {
      completed: this.Check,
      pending: this.Clock,
      failed: this.X
    };
    return icons[status] || this.Clock;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }

  downloadInvoice(invoice: string) {
    console.log('Descargando factura:', invoice);
    alert(`Descargando: ${invoice}`);
  }

  exportHistory() {
    console.log('Exportando historial completo');
    alert('Exportando historial de pagos...');
  }
}