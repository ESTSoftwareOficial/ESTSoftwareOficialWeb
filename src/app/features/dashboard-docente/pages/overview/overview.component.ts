import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CourseCardComponent } from "../../components/course-card/course-card.component";
import { LucideAngularModule, Plus, BookOpen, Star, Users, TrendingUp, Award } from 'lucide-angular';

interface Course {
  imgSrc: string;
  nameCourse: string;
  tecnologyIcon: string;
  teacher: string;
  averageRating: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CourseCardComponent, LucideAngularModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('glowContainer') glowContainers!: QueryList<ElementRef<HTMLDivElement>>;

  userName: string = 'Ameth Toledo';
  readonly Plus = Plus;
  readonly BookOpen = BookOpen;
  readonly Star = Star;
  readonly TrendingUp = TrendingUp;
  readonly Award = Award;
  readonly Users = Users;

  private lastPosition = { x: 0, y: 0 };
  private animationFrameId: number = 0;

  courses: Course[] = [
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Curso Completo de Angular desde Cero',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.8'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'React Avanzado con TypeScript',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.9'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Node.js y Express desde Cero',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.7'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Vue.js 3 Composition API',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.6'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Spring Boot y Microservicios desde Cero',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.8'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Docker y Kubernetes para Desarrolladores',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.9'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Git y GitHub Profesional',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.8'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Linux para Desarrolladores y DevOps',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.7'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Go (Golang) desde Cero a Microservicios',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.8'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Bases de Datos con PostgreSQL',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.6'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Arquitectura de Software y Clean Architecture',
      tecnologyIcon: 'https://cdn-icons-png.flaticon.com/512/2721/2721295.png',
      teacher: 'Ameth Toledo',
      averageRating: '4.9'
    },
    {
      imgSrc: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
      nameCourse: 'Testing Automatizado con Jest y Cypress',
      tecnologyIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
      teacher: 'Ameth Toledo',
      averageRating: '4.8'
    }
  ];

  ngAfterViewInit(): void {
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private setupEventListeners(): void {
    document.body.addEventListener('pointermove', this.handlePointerMove, { passive: true });
  }

  private cleanup(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    document.body.removeEventListener('pointermove', this.handlePointerMove);
  }

  private handlePointerMove = (e: PointerEvent): void => {
    this.handleMove(e);
  };

  private handleMove(e?: PointerEvent): void {
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
        const proximity = 150;
        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        element.style.setProperty('--active', isActive ? '1' : '0');

        if (!isActive) return;

        let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
        element.style.setProperty('--start', String(targetAngle));
      });
    });
  }
}