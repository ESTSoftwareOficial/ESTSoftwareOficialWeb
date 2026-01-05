import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  @Input() index = 0;
  @Input() layout = false;
  @Output() cardClose = new EventEmitter<number>();

  @Input() imgBannerSrc = '';

  constructor(private router: Router) {}

  navigateToCourse() {
    const courseName = this.card.title.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/dashboard/courses', courseName]);
    this.cardClose.emit(this.index);
  }

  get imgSrc(): string {
    return this.card.src;
  }

  get nameCourse(): string {
    return this.card.title;
  }

  get tecnologyIcon(): string {
    return this.card.category.charAt(0);
  }

  get teacher(): string {
    return this.card.instructor || 'Instructor';
  }

  get averageRating(): string {
    return (this.card.rating || 5.0).toString();
  }
}