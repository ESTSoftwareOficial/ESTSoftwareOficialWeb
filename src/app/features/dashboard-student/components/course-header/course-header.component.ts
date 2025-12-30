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
  @Input() courseImage: string = '';
  @Input() courseName: string = '';
  @Input() courseTitle: string = '';
  @Input() courseDescription: string = '';
  @Input() publishDate: string = '';
  @Input() courseLevel: string = '';
  @Input() totalModules: number = 0;
}
