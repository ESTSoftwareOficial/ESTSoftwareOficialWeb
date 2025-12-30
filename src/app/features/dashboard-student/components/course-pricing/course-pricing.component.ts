import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-pricing.component.html',
  styleUrl: './course-pricing.component.css'
})
export class CoursePricingComponent {
  @Input() originalPrice: number = 0;
  @Input() discountedPrice: number = 0;
  @Input() monthlyPrice: number = 0;

  get discountPercentage(): number {
    if (this.originalPrice === 0) return 0;
    return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
  }
}
