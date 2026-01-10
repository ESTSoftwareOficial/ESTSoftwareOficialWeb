import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-header.component.html',
  styleUrl: './lesson-header.component.css'
})
export class LessonHeaderComponent {
  @Input() currentLessonNumber = 1;
  @Input() totalLessons = 48;
  @Input() lessonTitle = 'Introducción a Angular';
  @Input() isFirstLesson = false;
  @Input() isLastLesson = false;

  @Output() previousLesson = new EventEmitter<void>();
  @Output() nextLesson = new EventEmitter<void>();

  onPrevious() {
    if (!this.isFirstLesson) {
      this.previousLesson.emit();
    }
  }

  onNext() {
    if (!this.isLastLesson) {
      this.nextLesson.emit();
    }
  }
}
