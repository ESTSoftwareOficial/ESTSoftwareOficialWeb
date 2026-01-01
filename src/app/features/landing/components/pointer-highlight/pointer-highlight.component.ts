import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pointer-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pointer-highlight.component.html',
  styleUrl: './pointer-highlight.component.css'
})
export class PointerHighlightComponent implements AfterViewInit, OnDestroy {
  @Input() rectangleClassName?: string;
  @Input() pointerClassName?: string;
  @Input() containerClassName?: string;

  @ViewChild('containerRef') containerRef!: ElementRef<HTMLDivElement>;

  dimensions = { width: 0, height: 0 };
  isVisible = false;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.setupResizeObserver();
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupResizeObserver(): void {
    if (this.containerRef) {
      const { width, height } = this.containerRef.nativeElement.getBoundingClientRect();
      this.dimensions = { width, height };
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.dimensions = { width, height };
      }
    });

    if (this.containerRef) {
      this.resizeObserver.observe(this.containerRef.nativeElement);
    }
  }

  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.containerRef) {
      this.intersectionObserver.observe(this.containerRef.nativeElement);
    }
  }
}