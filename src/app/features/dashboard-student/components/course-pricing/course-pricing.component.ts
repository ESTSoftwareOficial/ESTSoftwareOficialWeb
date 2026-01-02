import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, CreditCard } from 'lucide-angular';

@Component({
  selector: 'app-course-pricing',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './course-pricing.component.html',
  styleUrl: './course-pricing.component.css'
})
export class CoursePricingComponent {
  @Input() originalPrice: number = 0;
  @Input() discountedPrice: number = 0;
  @Input() monthlyPrice: number = 0;
  @Input() courseId!: string;
  @Input() courseName!: string;

  readonly CreditCard = CreditCard;

  paymentMethods = [
    { name: 'Mastercard', logo: 'assets/metodos-pago/mastercard.svg' },
    { name: 'Visa', logo: 'assets/metodos-pago/visa.svg' },
    { name: 'Google Pay', logo: 'assets/metodos-pago/google-pay.svg' },
    { name: 'PayPal', logo: 'assets/metodos-pago/paypal.svg' },
    { name: 'Mercado Pago', logo: 'assets/metodos-pago/mercado-pago.svg' }
  ];

  constructor(private router: Router) {}

  get discountPercentage(): number {
    if (this.originalPrice === 0) return 0;
    return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
  }

  handlePurchase(): void {
    this.router.navigate(['/checkout'], {
      state: {
        courseId: this.courseId,
        courseName: this.courseName,
        price: this.discountedPrice,
        originalPrice: this.originalPrice,
        monthlyPrice: this.monthlyPrice
      }
    });
  }
}