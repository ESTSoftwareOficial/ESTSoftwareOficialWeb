import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Menu, X, Search, Heart } from 'lucide-angular';
import { filter } from 'rxjs/operators';
import { ExpandableCardsComponent, CourseCard } from '../expandable-cards/expandable-cards.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, ExpandableCardsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  readonly Menu = Menu;
  readonly X = X;
  readonly Search = Search;
  readonly Heart = Heart;

  scrollY = 0;
  searchQuery = '';
  mobileMenuOpen = false;
  mobileSearchOpen = false;
  showSearchResults = false;
  currentPath = '';
  favoritesCount = 0;
  searchResults: CourseCard[] = [];

  allCourses: CourseCard[] = [
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
      content: 'Aprende Angular desde los fundamentos hasta conceptos avanzados. Construye aplicaciones web modernas y escalables con el framework más popular de Google.'
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
      content: 'Domina React con TypeScript para crear aplicaciones robustas y escalables.'
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
      content: 'Construye APIs REST y aplicaciones backend escalables con Node.js y Express.'
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
      content: 'Aprende Python y Django para crear aplicaciones web robustas.'
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
      content: 'Domina Vue.js 3 con Composition API, Pinia para estado global, Vue Router.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.urlAfterRedirects;
      });

    this.currentPath = this.router.url;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollY = window.scrollY;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('form') && !target.closest('app-expandable-cards') && !target.closest('.search-results-container')) {
      this.showSearchResults = false;
    }
  }

  get visible(): boolean {
    return this.scrollY > 100;
  }

  isActive(path: string): boolean {
    return this.currentPath === path;
  }

  handleSearch(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.searchQuery.trim()) {
      this.searchResults = this.allCourses.filter(course => 
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.showSearchResults = true;
    } else {
      this.searchResults = [];
      this.showSearchResults = false;
    }
  }

  handleNavClick(): void {
    this.mobileMenuOpen = false;
    this.showSearchResults = false;
  }

  toggleMobileSearch(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
    if (!this.mobileSearchOpen) {
      this.showSearchResults = false;
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}