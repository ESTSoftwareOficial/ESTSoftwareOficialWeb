import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { DescriptionLessonComponent } from "../../components/description-lesson/description-lesson.component";
import { CommentsSectionComponent } from "../../components/comments-section/comments-section.component";
import { LessonResourcesComponent } from "../../components/lesson-resources/lesson-resources.component";

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  
  transform(url: string, type: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  contentType: string;
  videoUrl: string;
  bodyText: string;
  durationMinutes: number;
  orderIndex: number;
  isPreview: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule, SafePipe, NavbarComponent, DescriptionLessonComponent, CommentsSectionComponent, LessonResourcesComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {
  courseName = '';
  
  currentLesson: Lesson = {
    id: 1,
    moduleId: 1,
    title: "Introducción a Angular - Video Tutorial",
    contentType: "video",
    videoUrl: "https://iframe.mediadelivery.net/embed/571915/e66464c3-5ea7-46fa-b882-80532bc88c70",
    bodyText: "En esta lección aprenderás los conceptos básicos de Angular y cómo empezar a construir aplicaciones modernas con este poderoso framework.",
    durationMinutes: 1,
    orderIndex: 1,
    isPreview: true,
    createdAt: "2025-12-29T14:01:57.981018Z"
  };

  constructor(
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nameParam = params.get('name');
      if (nameParam) {
        this.courseName = nameParam.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        this.titleService.setTitle(`${this.courseName} | ESTSoftware`);
      }
    });
  }
}
