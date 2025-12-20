import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechLanguage {
  name: string;
  iconUrl: string;
  description: string;
  area: string;
}

@Component({
  selector: 'app-tech-languages-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-languages-grid.component.html',
  styleUrl: './tech-languages-grid.component.css'
})
export class TechLanguagesGridComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('glowContainer') glowContainers!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('gridBackground') gridBackground!: ElementRef<HTMLDivElement>;

  private lastPosition = { x: 0, y: 0 };
  private animationFrameId: number = 0;
  private observer!: IntersectionObserver;
  isVisible = false;

  languages: TechLanguage[] = [
    {
      name: 'Java',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      description: 'Domina el desarrollo empresarial con uno de los lenguajes más utilizados en el mundo.',
      area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]'
    },
    {
      name: 'TypeScript',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      description: 'Aprende JavaScript con superpoderes. El futuro del desarrollo web moderno.',
      area: 'md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]'
    },
    {
      name: 'Go',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      description: 'El lenguaje de Google para construir sistemas escalables y de alto rendimiento.',
      area: 'md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]'
    },
    {
      name: 'Python',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      description: 'Desde IA hasta desarrollo web. El lenguaje más versátil del momento.',
      area: 'md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]'
    },
    {
      name: 'Kotlin',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      description: 'El lenguaje moderno para Android y desarrollo multiplataforma.',
      area: 'md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]'
    }
  ];

  ngAfterViewInit(): void {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.animateGrid();
  }

  ngOnDestroy(): void {
    this.cleanup();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.gridBackground) {
      this.observer.observe(this.gridBackground.nativeElement);
    }
  }

  private animateGrid(): void {
    let scrollY = 0;
    const animate = () => {
      if (this.gridBackground?.nativeElement) {
        scrollY += 0.5;
        this.gridBackground.nativeElement.style.backgroundPosition = `0 ${scrollY}px`;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  private setupEventListeners(): void {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    document.body.addEventListener('pointermove', this.handlePointerMove, { passive: true });
  }

  private cleanup(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('scroll', this.handleScroll);
    document.body.removeEventListener('pointermove', this.handlePointerMove);
  }

  private handleScroll = (): void => {
    this.handleMove();
  };

  private handlePointerMove = (e: PointerEvent): void => {
    this.handleMove(e);
  };

  private handleMove(e?: PointerEvent | { x: number; y: number }): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      this.glowContainers.forEach(containerRef => {
        const element = containerRef.nativeElement;
        if (!element) return;

        const { left, top, width, height } = element.getBoundingClientRect();
        const mouseX = e?.x ?? this.lastPosition.x;
        const mouseY = e?.y ?? this.lastPosition.y;

        if (e) {
          this.lastPosition = { x: mouseX, y: mouseY };
        }

        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
        const inactiveRadius = 0.5 * Math.min(width, height) * 0.01;

        if (distanceFromCenter < inactiveRadius) {
          element.style.setProperty('--active', '0');
          return;
        }

        const proximity = 64;
        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        element.style.setProperty('--active', isActive ? '1' : '0');

        if (!isActive) return;

        const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
        let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        const newAngle = currentAngle + angleDiff;

        this.animateAngle(element, currentAngle, newAngle);
      });
    });
  }

  private animateAngle(element: HTMLElement, from: number, to: number): void {
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const value = from + (to - from) * easeProgress;
      
      element.style.setProperty('--start', String(value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}