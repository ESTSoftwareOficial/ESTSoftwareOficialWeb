import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CourseCardComponent } from "../../components/course-card/course-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CourseCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    email = 'ameth.toledo@example.com';
    activeTab: 'cursos' | 'certificados' = 'cursos';

    selectTab(tab: 'cursos' | 'certificados') {
        this.activeTab = tab;
    }
}
