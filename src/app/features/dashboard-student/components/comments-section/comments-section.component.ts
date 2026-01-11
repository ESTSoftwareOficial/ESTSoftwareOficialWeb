import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MessageSquare, Smile, Sticker, Film, Send, X } from 'lucide-angular';
import { Database } from 'emoji-picker-element';
import 'emoji-picker-element';

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
  imports: [CommonModule, FormsModule, LucideAngularModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent implements AfterViewInit {
  @Input() lessonId = 0;
  @ViewChild('commentTextarea') commentTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('pickerContainer') pickerContainer!: ElementRef;
  
  readonly MessageSquare = MessageSquare;
  readonly Smile = Smile;
  readonly Sticker = Sticker;
  readonly Film = Film;
  readonly Send = Send;
  readonly X = X;
  
  newComment = '';
  replyText = '';
  showEmojiPicker = false;
  showStickerPicker = false;
  showGifPicker = false;
  showReplyEmojiPicker = false;
  replyingToComment: Comment | null = null;
  
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
    },
    {
      id: 5,
      user: 'Ana López',
      userAvatar: 'assets/ameth.png',
      comment: 'Perfecto timing, justo lo que necesitaba para mi proyecto.',
      timestamp: 'Hace 1 día',
      likes: 3,
      userHasLiked: false
    }
  ];

  sortBy: 'recent' | 'popular' = 'recent';

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {
    const db = new Database();
    db.getEmojiByUnicodeOrName('😀'); 
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.pickerContainer && !this.pickerContainer.nativeElement.contains(target)) {
      this.closeAllPickers();
    }
  }

  ngAfterViewInit() {
    const pickers = document.querySelectorAll('emoji-picker');
    pickers.forEach((picker: any) => {
      picker.dataSource = 'https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json';
    });
  }

  setupEmojiPicker() {
    setTimeout(() => {
      const picker = document.querySelector('emoji-picker.emoji-picker-custom');
      
      if (picker) {
        picker.removeEventListener('emoji-click', this.handleMainEmojiClick);
        picker.addEventListener('emoji-click', this.handleMainEmojiClick);
      }
    }, 100);
  }

  handleMainEmojiClick = (event: any) => {
    this.zone.run(() => {
      const emoji = event.detail.unicode;
      const textarea = this.commentTextarea.nativeElement;
      const start = textarea.selectionStart || 0;
      const end = textarea.selectionEnd || 0;
      
      this.newComment = this.newComment.substring(0, start) + emoji + this.newComment.substring(end);
      
      setTimeout(() => {
        textarea.focus();
        const newPos = start + emoji.length;
        textarea.setSelectionRange(newPos, newPos);
        this.cdr.detectChanges();
      }, 0);
    });
  }

  setupReplyEmojiPicker(commentId: number) {
    setTimeout(() => {
      const picker = document.querySelector(`emoji-picker.reply-emoji-picker-${commentId}`);
      
      if (picker) {
        picker.removeEventListener('emoji-click', this.handleReplyEmojiClick);
        picker.addEventListener('emoji-click', this.handleReplyEmojiClick);
      }
    }, 100);
  }

  handleReplyEmojiClick = (event: any) => {
    this.zone.run(() => {
      const emoji = event.detail.unicode;
      const commentId = this.replyingToComment?.id;
      
      if (!commentId) return;
      
      const textarea = document.querySelector(`#reply-textarea-${commentId}`) as HTMLTextAreaElement;
      
      if (textarea) {
        const start = textarea.selectionStart || 0;
        const end = textarea.selectionEnd || 0;
        
        this.replyText = this.replyText.substring(0, start) + emoji + this.replyText.substring(end);
        
        setTimeout(() => {
          textarea.focus();
          const newPos = start + emoji.length;
          textarea.setSelectionRange(newPos, newPos);
          this.cdr.detectChanges();
        }, 0);
      }
    });
  }

  onCommentChange() {
    this.cdr.detectChanges();
  }

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

  startReply(comment: Comment) {
    this.replyingToComment = comment;
    this.replyText = '';
    
    setTimeout(() => {
      const textarea = document.querySelector(`#reply-textarea-${comment.id}`) as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
      }
    }, 100);
  }

  cancelReply() {
    this.replyingToComment = null;
    this.replyText = '';
    this.showReplyEmojiPicker = false;
  }

  addReply() {
    if (this.replyText.trim() && this.replyingToComment) {
      const reply: Comment = {
        id: Date.now(),
        user: 'Tú',
        userAvatar: 'assets/ameth.png',
        comment: this.replyText,
        timestamp: 'Justo ahora',
        likes: 0,
        userHasLiked: false
      };

      if (!this.replyingToComment.replies) {
        this.replyingToComment.replies = [];
      }
      
      this.replyingToComment.replies.push(reply);
      this.replyText = '';
      this.replyingToComment = null;
      this.showReplyEmojiPicker = false;
    }
  }

  toggleLike(comment: Comment) {
    comment.userHasLiked = !comment.userHasLiked;
    comment.likes += comment.userHasLiked ? 1 : -1;
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    this.showStickerPicker = false;
    this.showGifPicker = false;
    
    if (this.showEmojiPicker) {
      this.setupEmojiPicker();
    }
  }

  toggleReplyEmojiPicker(commentId: number) {
    this.showReplyEmojiPicker = !this.showReplyEmojiPicker;
    
    if (this.showReplyEmojiPicker) {
      this.setupReplyEmojiPicker(commentId);
    }
  }

  toggleStickerPicker() {
    this.showStickerPicker = !this.showStickerPicker;
    this.showEmojiPicker = false;
    this.showGifPicker = false;
  }

  toggleGifPicker() {
    this.showGifPicker = !this.showGifPicker;
    this.showEmojiPicker = false;
    this.showStickerPicker = false;
  }

  closeAllPickers() {
    this.showEmojiPicker = false;
    this.showStickerPicker = false;
    this.showGifPicker = false;
    this.showReplyEmojiPicker = false;
  }

  get sortedComments() {
    if (this.sortBy === 'popular') {
      return [...this.comments].sort((a, b) => b.likes - a.likes);
    }
    return this.comments;
  }
}