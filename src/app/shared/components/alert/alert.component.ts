import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check, X, AlertTriangle, Info } from 'lucide-angular';
import gsap from 'gsap';

export type ModalType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  readonly Check = Check;
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;
  readonly Info = Info;

  @Input() isOpen: boolean = false;
  @Input() type: ModalType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() confirmText: string = 'Aceptar';
  @Input() cancelText: string = 'Cancelar';
  @Input() showCancel: boolean = false;
  
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.isOpen) {
      this.animateIn();
    }
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.animateIn();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  animateIn(): void {
    setTimeout(() => {
      const overlay = document.querySelector('.modal-overlay');
      const content = document.querySelector('.modal-content');
      
      if (overlay && content) {
        gsap.fromTo(overlay, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.3 }
        );
        
        gsap.fromTo(content,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );
      }
    }, 0);
  }

  animateOut(callback: () => void): void {
    const overlay = document.querySelector('.modal-overlay');
    const content = document.querySelector('.modal-content');
    
    if (overlay && content) {
      const timeline = gsap.timeline({
        onComplete: () => {
          callback();
          document.body.style.overflow = 'auto';
        }
      });
      
      timeline
        .to(content, { scale: 0.9, opacity: 0, y: 20, duration: 0.3 })
        .to(overlay, { opacity: 0, duration: 0.2 }, '-=0.1');
    } else {
      callback();
      document.body.style.overflow = 'auto';
    }
  }

  handleConfirm(): void {
    this.animateOut(() => {
      this.onConfirm.emit();
      this.onClose.emit();
    });
  }

  handleCancel(): void {
    this.animateOut(() => {
      this.onCancel.emit();
      this.onClose.emit();
    });
  }

  handleClose(): void {
    this.animateOut(() => {
      this.onClose.emit();
    });
  }

  getIcon(): string {
    const icons = {
      success: `<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />`,
      error: `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />`,
      warning: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`,
      info: `<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
    };
    return icons[this.type];
  }

  getButtonIcon() {
    const icons = {
      success: this.Check,
      error: this.X,
      warning: this.AlertTriangle,
      info: this.Info
    };
    return icons[this.type];
  }

  getStatusIconColor(): string {
    const colors = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500'
    };
    return colors[this.type];
  }

  getStatusIconBg(): string {
    const backgrounds = {
      success: 'bg-green-500/20',
      error: 'bg-red-500/20',
      warning: 'bg-yellow-500/20',
      info: 'bg-blue-500/20'
    };
    return backgrounds[this.type];
  }

  getTitleColor(): string {
    const colors = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500'
    };
    return colors[this.type];
  }

  getHeaderBg(): string {
    const backgrounds = {
      success: 'bg-green-500/5',
      error: 'bg-red-500/5',
      warning: 'bg-yellow-500/5',
      info: 'bg-blue-500/5'
    };
    return backgrounds[this.type];
  }

  getModalBorder(): string {
    const borders = {
      success: 'border-2 border-green-500/30',
      error: 'border-2 border-red-500/30',
      warning: 'border-2 border-yellow-500/30',
      info: 'border-2 border-blue-500/30'
    };
    return borders[this.type];
  }

  getButtonClasses(): string {
    const classes = {
      success: 'border-green-500 hover:bg-green-500 hover:text-black',
      error: 'border-red-500 hover:bg-red-500 hover:text-white',
      warning: 'border-yellow-500 hover:bg-yellow-500 hover:text-black',
      info: 'border-blue-500 hover:bg-blue-500 hover:text-white'
    };
    return classes[this.type];
  }
}