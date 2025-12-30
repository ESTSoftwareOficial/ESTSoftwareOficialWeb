import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() imgSrc: string = '';
  @Input() nameCourse: string = '';
  @Input() tecnologyIcon: string = '';
  @Input() teacher: string = '';
  @Input() averageRating: string = '';

  constructor(private router: Router) {}

  navigateToCourse() {
    const courseName = this.nameCourse.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/dashboard/courses', courseName]);
  }
}