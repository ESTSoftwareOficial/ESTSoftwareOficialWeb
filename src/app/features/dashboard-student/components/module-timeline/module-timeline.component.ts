import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: number;
  duration: number;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-module-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-timeline.component.html',
  styleUrl: './module-timeline.component.css'
})
export class ModuleTimelineComponent {
  @Input() modules: Module[] = [];
  @Input() courseName: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  getThumbnail(module: Module): string {
    if (module.thumbnailUrl) {
      return module.thumbnailUrl;
    }
    return `https://via.placeholder.com/120x68/1d1f23/ffffff?text=Módulo+${module.id}`;
  }

  navigateToLesson(module: Module) {
    const courseSlug = this.courseName.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/dashboard/courses', courseSlug, 'lesson', module.id]);
  }
}