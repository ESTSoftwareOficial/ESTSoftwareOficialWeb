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
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() instructor: string = 'Ameth Toledo';
  @Input() instructorRole: string = 'FullStack Jr Developer';
  @Input() instructorAvatar: string = 'assets/ameth.png';
  @Input() portfolioUrl: string = 'https://www.amethdev.pro';

  likesCount = 0;
  userHasLiked = false;

  toggleLike() {
    this.userHasLiked = !this.userHasLiked;
    this.likesCount += this.userHasLiked ? 1 : -1;
  }
}