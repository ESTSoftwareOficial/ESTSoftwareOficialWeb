import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, CreditCard, Lock, CheckCircle } from 'lucide-angular';
import { CheckoutData } from '../../domain/checkout.data';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutData!: CheckoutData;
  paymentForm!: FormGroup;
  isProcessing = false;
  paymentSuccess = false;

  readonly CreditCard = CreditCard;
  readonly Lock = Lock;
  readonly CheckCircle = CheckCircle;

  paymentMethods = [
    { id: 'card', name: 'Tarjeta de Crédito/Débito', icon: 'credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal' },
    { id: 'mercadopago', name: 'Mercado Pago', icon: 'mercadopago' }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as CheckoutData;
    
    if (state) {
      this.checkoutData = state;
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onPaymentMethodChange(method: string): void {
    this.paymentForm.patchValue({ paymentMethod: method });
    
    if (method === 'card') {
      this.enableCardFields();
    } else {
      this.disableCardFields();
    }
  }

  // Método para obtener las clases del botón
  getPaymentMethodClasses(methodId: string): string {
    const isSelected = this.paymentForm.get('paymentMethod')?.value === methodId;
    const baseClasses = 'border-2 hover:border-green-500 rounded-xl p-4 transition-all text-center';
    
    if (isSelected) {
      return `${baseClasses} border-green-500 bg-green-500 bg-opacity-10`;
    }
    return `${baseClasses} border-gray-700`;
  }

  enableCardFields(): void {
    this.paymentForm.get('cardNumber')?.enable();
    this.paymentForm.get('cardName')?.enable();
    this.paymentForm.get('expiryDate')?.enable();
    this.paymentForm.get('cvv')?.enable();
  }

  disableCardFields(): void {
    this.paymentForm.get('cardNumber')?.disable();
    this.paymentForm.get('cardName')?.disable();
    this.paymentForm.get('expiryDate')?.disable();
    this.paymentForm.get('cvv')?.disable();
  }

  async processPayment(): Promise<void> {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;

    try {
      const paymentData = {
        ...this.paymentForm.value,
        courseId: this.checkoutData.courseId,
        amount: this.checkoutData.price
      };

      await this.paymentService.processPayment(paymentData).toPromise();
      
      this.paymentSuccess = true;
      
      setTimeout(() => {
        this.router.navigate(['/dashboard/courses']);
      }, 3000);
      
    } catch (error) {
      console.error('Error procesando el pago:', error);
      alert('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      this.isProcessing = false;
    }
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.paymentForm.patchValue({ cardNumber: formattedValue.replace(/\s/g, '') });
    event.target.value = formattedValue;
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    event.target.value = value;
    this.paymentForm.patchValue({ expiryDate: value });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/']);
  }

  get discountAmount(): number {
    return this.checkoutData.originalPrice - this.checkoutData.price;
  }

  get discountPercentage(): number {
    if (this.checkoutData.originalPrice === 0) return 0;
    return Math.round((this.discountAmount / this.checkoutData.originalPrice) * 100);
  }
}