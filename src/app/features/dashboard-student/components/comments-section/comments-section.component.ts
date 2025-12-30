import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  user: string;
  userAvatar: string;
  comment: string;
  timestamp: string;
  likes: number;
  userHasLiked: boolean;
  replies?: Comment[];
}

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent {
  @Input() lessonId: number = 0;
  
  newComment: string = '';
  comments: Comment[] = [
    {
      id: 1,
      user: 'Juan Pérez',
      userAvatar: 'assets/ameth.png',
      comment: 'Excelente explicación, muy claro y conciso. Me ayudó mucho a entender el tema.',
      timestamp: 'Hace 2 horas',
      likes: 5,
      userHasLiked: false,
      replies: [
        {
          id: 2,
          user: 'Ameth Toledo',
          userAvatar: 'assets/ameth.png',
          comment: '¡Gracias por tu comentario! Me alegra que te haya sido útil.',
          timestamp: 'Hace 1 hora',
          likes: 2,
          userHasLiked: false
        }
      ]
    },
    {
      id: 3,
      user: 'María García',
      userAvatar: 'assets/ameth.png',
      comment: '¿Podrías hacer un video sobre hooks avanzados?',
      timestamp: 'Hace 3 horas',
      likes: 8,
      userHasLiked: true
    },
    {
      id: 4,
      user: 'Carlos Ruiz',
      userAvatar: 'assets/ameth.png',
      comment: 'Me encanta tu forma de enseñar, sigue así!',
      timestamp: 'Hace 5 horas',
      likes: 12,
      userHasLiked: false
    }
  ];

  sortBy: 'recent' | 'popular' = 'recent';

  addComment() {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: 'Tú',
        userAvatar: 'assets/ameth.png',
        comment: this.newComment,
        timestamp: 'Justo ahora',
        likes: 0,
        userHasLiked: false
      };
      this.comments.unshift(comment);
      this.newComment = '';
    }
  }

  toggleLike(comment: Comment) {
    comment.userHasLiked = !comment.userHasLiked;
    comment.likes += comment.userHasLiked ? 1 : -1;
  }

  get sortedComments() {
    if (this.sortBy === 'popular') {
      return [...this.comments].sort((a, b) => b.likes - a.likes);
    }
    return this.comments;
  }
}