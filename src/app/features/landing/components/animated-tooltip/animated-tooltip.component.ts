import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TooltipItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

@Component({
  selector: 'app-animated-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-tooltip.component.html',
  styleUrls: ['./animated-tooltip.component.css']
})
export class AnimatedTooltipComponent implements OnInit, OnDestroy {
  @Input() items: TooltipItem[] = [];
  
  hoveredIndex: number | null = null;
  mousePosition = { x: 0, y: 0 };
  private animationFrame: number | null = null;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  onMouseEnter(id: number): void {
    this.hoveredIndex = id;
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
    this.mousePosition = { x: 0, y: 0 };
  }

  onMouseMove(event: MouseEvent, element: HTMLElement): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const halfWidth = rect.width / 2;
      this.mousePosition.x = event.clientX - rect.left - halfWidth;
    });
  }

  getTooltipStyle(itemId: number): any {
    if (this.hoveredIndex !== itemId) return {};
    
    const translateX = this.mousePosition.x * 0.5;
    const rotate = this.mousePosition.x * 0.45;
    
    return {
      transform: `translateX(calc(-50% + ${translateX}px)) rotate(${rotate}deg)`
    };
  }
}