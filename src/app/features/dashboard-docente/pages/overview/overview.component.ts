import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CourseCardComponent } from "../../components/course-card/course-card.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CourseCardComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  userName: string = 'Ameth Toledo'
}