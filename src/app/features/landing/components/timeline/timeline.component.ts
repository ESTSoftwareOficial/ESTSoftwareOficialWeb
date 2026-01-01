import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check } from 'lucide-angular';
import { PointerHighlightComponent } from '../pointer-highlight/pointer-highlight.component';

export interface TimelineEntry {
  title: string;
  content: {
    description: string[];
    items?: string[];
    images?: string[];
  };
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, PointerHighlightComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @Input() data: TimelineEntry[] = [];
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('lineRef') lineRef!: ElementRef<HTMLDivElement>;

  readonly Check = Check;

  height = 0;
  scrollProgress = 0;
  private resizeObserver?: ResizeObserver;
  private scrollHandler?: () => void;

  ngAfterViewInit(): void {
    this.calculateHeight();
    this.setupScrollListener();
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private calculateHeight(): void {
    if (this.lineRef) {
      const rect = this.lineRef.nativeElement.getBoundingClientRect();
      this.height = rect.height;
    }
  }

  private setupScrollListener(): void {
    this.scrollHandler = () => {
      if (!this.containerRef) return;

      const container = this.containerRef.nativeElement;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = rect.top - windowHeight * 0.1;
      const end = rect.bottom - windowHeight * 0.5;
      const scrollRange = end - start;
      
      if (start > 0) {
        this.scrollProgress = 0;
      } else if (end < 0) {
        this.scrollProgress = 1;
      } else {
        this.scrollProgress = Math.max(0, Math.min(1, -start / scrollRange));
      }
    };

    window.addEventListener('scroll', this.scrollHandler);
    this.scrollHandler();
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateHeight();
    });

    if (this.lineRef) {
      this.resizeObserver.observe(this.lineRef.nativeElement);
    }
  }

  getLineHeight(): string {
    return `${this.scrollProgress * this.height}px`;
  }

  getLineOpacity(): number {
    return Math.max(0, Math.min(1, this.scrollProgress * 10));
  }
}