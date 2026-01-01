import { Component, Input, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import gsap from 'gsap';

export interface CourseCard {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  instructor: string;
  price?: number;
  level?: string;
  duration?: string;
  content: string;
}

@Component({
  selector: 'app-expandable-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expandable-cards.component.html',
  styleUrl: './expandable-cards.component.css'
})
export class ExpandableCardsComponent implements OnInit {
  @Input() courses: CourseCard[] = [];
  @ViewChild('modalOverlay') modalOverlay?: ElementRef;
  @ViewChild('modalContent') modalContent?: ElementRef;
  
  activeCard: CourseCard | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.courses.length === 0) {
      this.courses = this.getDefaultCourses();
    }
  }

  openCard(card: CourseCard): void {
    this.activeCard = card;
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      if (this.modalOverlay && this.modalContent) {
        gsap.fromTo(
          this.modalOverlay.nativeElement,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        
        gsap.fromTo(
          this.modalContent.nativeElement,
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        );
      }
    }, 0);
  }

  closeCard(): void {
    if (this.modalOverlay && this.modalContent) {
      const timeline = gsap.timeline({
        onComplete: () => {
          this.activeCard = null;
          document.body.style.overflow = 'auto';
        }
      });

      timeline
        .to(this.modalContent.nativeElement, {
          scale: 0.95,
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(this.modalOverlay.nativeElement, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        }, '-=0.1');
    } else {
      this.activeCard = null;
      document.body.style.overflow = 'auto';
    }
  }

  navigateToCourse(link: string): void {
    this.closeCard();
    setTimeout(() => {
      this.router.navigate([link]);
    }, 400);
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.activeCard) {
      this.closeCard();
    }
  }

  getDefaultCourses(): CourseCard[] {
    return [
      {
        id: 1,
        title: 'Angular Completo',
        description: 'Desde cero hasta experto',
        image: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
        ctaText: 'Ver curso',
        ctaLink: '/dashboard/courses/angular-completo',
        instructor: 'Ameth Toledo',
        price: 167,
        level: 'Principiante',
        duration: '40 horas',
        content: 'Aprende Angular desde los fundamentos hasta conceptos avanzados. Construye aplicaciones web modernas y escalables con el framework más popular de Google. Incluye proyectos prácticos, mejores prácticas y patrones de diseño.'
      },
      {
        id: 2,
        title: 'React & TypeScript',
        description: 'Desarrollo Frontend Moderno',
        image: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
        ctaText: 'Ver curso',
        ctaLink: '/dashboard/courses/react-typescript',
        instructor: 'Ameth Toledo',
        price: 199,
        level: 'Intermedio',
        duration: '35 horas',
        content: 'Domina React con TypeScript para crear aplicaciones robustas y escalables. Aprende hooks, context API, Redux, y las mejores prácticas de desarrollo frontend moderno.'
      },
      {
        id: 3,
        title: 'Node.js & Express',
        description: 'Backend con JavaScript',
        image: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
        ctaText: 'Ver curso',
        ctaLink: '/dashboard/courses/nodejs-express',
        instructor: 'Ameth Toledo',
        price: 189,
        level: 'Intermedio',
        duration: '45 horas',
        content: 'Construye APIs REST y aplicaciones backend escalables con Node.js y Express. Incluye autenticación, bases de datos, seguridad, testing y deploy en la nube.'
      },
      {
        id: 4,
        title: 'Python & Django',
        description: 'Desarrollo Web con Python',
        image: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
        ctaText: 'Ver curso',
        ctaLink: '/dashboard/courses/python-django',
        instructor: 'Ameth Toledo',
        price: 179,
        level: 'Principiante',
        duration: '50 horas',
        content: 'Aprende Python y Django para crear aplicaciones web robustas. Desde los fundamentos de Python hasta aplicaciones web completas con Django.'
      },
      {
        id: 5,
        title: 'Vue.js 3 Completo',
        description: 'Framework Progresivo',
        image: 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp',
        ctaText: 'Ver curso',
        ctaLink: '/dashboard/courses/vuejs-completo',
        instructor: 'Ameth Toledo',
        price: 159,
        level: 'Principiante',
        duration: '38 horas',
        content: 'Domina Vue.js 3 con Composition API, Pinia para estado global, Vue Router y las mejores prácticas para crear SPAs modernas.'
      }
    ];
  }
}