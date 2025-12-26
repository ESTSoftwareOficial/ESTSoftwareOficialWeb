import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Bell, Search, ChevronDown, User, CreditCard, Settings, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly Bell = Bell;
  readonly Search = Search;
  readonly ChevronDown = ChevronDown;
  readonly User = User;
  readonly CreditCard = CreditCard;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}