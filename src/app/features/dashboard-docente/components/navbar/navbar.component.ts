import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Bell, Search, ChevronDown, User, CreditCard, Settings, LogOut } from 'lucide-angular';
import { NotifyModalComponent } from '../notify-modal/notify-modal.component';
import { CourseCard } from '../../../../shared/components/expandable-cards/expandable-cards.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, NotifyModalComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() pageTitle = 'Dashboard';
  @Input() pageSubtitle?: string;

  readonly Bell = Bell;
  readonly Search = Search;
  readonly ChevronDown = ChevronDown;
  readonly User = User;
  readonly CreditCard = CreditCard;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  isDropdownOpen = false;
  isNotificationsOpen = false;
  searchQuery = '';
  showSearchResults = false;
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
      content: 'Aprende Angular desde los fundamentos hasta conceptos avanzados.'
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
      content: 'Domina React con TypeScript para crear aplicaciones robustas.'
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
      content: 'Construye APIs REST y aplicaciones backend escalables.'
    }
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container') && !target.closest('app-expandable-cards')) {
      this.showSearchResults = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  closeNotifications() {
    this.isNotificationsOpen = false;
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
}