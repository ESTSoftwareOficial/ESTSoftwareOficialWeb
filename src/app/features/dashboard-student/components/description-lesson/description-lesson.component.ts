import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-lesson.component.html',
  styleUrl: './description-lesson.component.css'
})
export class DescriptionLessonComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() instructor = 'Ameth Toledo';
  @Input() instructorRole = 'FullStack Jr Developer';
  @Input() instructorAvatar = 'assets/ameth.png';
  @Input() portfolioUrl = 'https://www.amethdev.pro';

  likesCount = 0;
  userHasLiked = false;

  toggleLike() {
    this.userHasLiked = !this.userHasLiked;
    this.likesCount += this.userHasLiked ? 1 : -1;
  }
}