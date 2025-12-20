import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { CourseCard } from '../course-carousel/course-carousel.component';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() card!: CourseCard;
  @Input() index: number = 0;
  @Input() layout: boolean = false;
  @Output() cardClose = new EventEmitter<number>();

  open = false;
  isLoading = true;

  handleOpen(): void {
    this.open = true;
    document.body.style.overflow = 'hidden';
  }

  handleClose(): void {
    this.open = false;
    document.body.style.overflow = 'auto';
    this.cardClose.emit(this.index);
  }

  onImageLoad(): void {
    this.isLoading = false;
  }

  getStarFillPercentage(starNumber: number): number {
    const rating = this.card.rating || 5;
    if (rating >= starNumber) {
      return 100;
    } else if (rating > starNumber - 1) {
      return (rating - (starNumber - 1)) * 100;
    }
    return 0;
  }
}