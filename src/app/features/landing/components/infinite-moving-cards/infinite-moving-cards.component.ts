import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  image: string;
}

@Component({
  selector: 'app-infinite-moving-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-moving-cards.component.html',
  styleUrl: './infinite-moving-cards.component.css'
})
export class InfiniteMovingCardsComponent implements OnInit, AfterViewInit {
  @Input() items: TestimonialItem[] = [];
  @Input() direction: 'left' | 'right' = 'left';
  @Input() speed: 'fast' | 'normal' | 'slow' = 'fast';
  @Input() pauseOnHover: boolean = true;
  @Input() className: string = '';

  @ViewChild('containerRef') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollerRef') scrollerRef!: ElementRef<HTMLUListElement>;

  start = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.addAnimation();
  }

  addAnimation(): void {
    if (this.containerRef && this.scrollerRef) {
      const scrollerContent = Array.from(this.scrollerRef.nativeElement.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        this.scrollerRef.nativeElement.appendChild(duplicatedItem);
      });

      this.getDirection();
      this.getSpeed();
      this.start = true;
    }
  }

  getDirection(): void {
    if (this.containerRef) {
      if (this.direction === 'left') {
        this.containerRef.nativeElement.style.setProperty('--animation-direction', 'forwards');
      } else {
        this.containerRef.nativeElement.style.setProperty('--animation-direction', 'reverse');
      }
    }
  }

  getSpeed(): void {
    if (this.containerRef) {
      if (this.speed === 'fast') {
        this.containerRef.nativeElement.style.setProperty('--animation-duration', '20s');
      } else if (this.speed === 'normal') {
        this.containerRef.nativeElement.style.setProperty('--animation-duration', '40s');
      } else {
        this.containerRef.nativeElement.style.setProperty('--animation-duration', '80s');
      }
    }
  }
}