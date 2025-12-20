import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../course-card/course-card.component';

export interface CourseCard {
  src: string;
  title: string;
  category: string;
  content?: string;
  rating?: number;
  level?: string;
  modules?: number;
  instructor?: string;
}

@Component({
  selector: 'app-course-carousel',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-carousel.component.html',
  styleUrl: './course-carousel.component.css'
})
export class CourseCarouselComponent implements AfterViewInit, OnDestroy {
  @Input() items: CourseCard[] = [];
  @Input() initialScroll: number = 0;

  @ViewChild('carouselRef') carouselRef!: ElementRef<HTMLDivElement>;

  canScrollLeft = false;
  canScrollRight = true;
  currentIndex = 0;

  ngAfterViewInit(): void {
    if (this.carouselRef) {
      this.carouselRef.nativeElement.scrollLeft = this.initialScroll;
      this.checkScrollability();
    }
  }

  ngOnDestroy(): void {}

  checkScrollability(): void {
    if (this.carouselRef) {
      const { scrollLeft, scrollWidth, clientWidth } = this.carouselRef.nativeElement;
      this.canScrollLeft = scrollLeft > 0;
      this.canScrollRight = scrollLeft < scrollWidth - clientWidth;
    }
  }

  scrollLeft(): void {
    if (this.carouselRef) {
      this.carouselRef.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.carouselRef) {
      this.carouselRef.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  handleCardClose(index: number): void {
    if (this.carouselRef) {
      const cardWidth = this.isMobile() ? 230 : 384;
      const gap = this.isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      this.carouselRef.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      this.currentIndex = index;
    }
  }

  private isMobile(): boolean {
    return window && window.innerWidth < 768;
  }
}