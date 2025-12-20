import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Menu, X, Search, Heart } from 'lucide-angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
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
  currentPath = '';
  favoritesCount = 0;

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

  get visible(): boolean {
    return this.scrollY > 100;
  }

  isActive(path: string): boolean {
    return this.currentPath === path;
  }

  handleSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchQuery.trim() } 
      });
      this.searchQuery = '';
      this.mobileSearchOpen = false;
    }
  }

  handleNavClick(): void {
    this.mobileMenuOpen = false;
  }

  toggleMobileSearch(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}