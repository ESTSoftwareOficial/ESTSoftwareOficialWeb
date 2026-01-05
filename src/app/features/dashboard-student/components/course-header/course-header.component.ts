import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-header.component.html',
  styleUrl: './course-header.component.css'
})
export class CourseHeaderComponent {
  @Input() courseImage = '';
  @Input() courseName = '';
  @Input() courseTitle = '';
  @Input() courseDescription = '';
  @Input() publishDate = '';
  @Input() courseLevel = '';
  @Input() totalModules = 0;
}
