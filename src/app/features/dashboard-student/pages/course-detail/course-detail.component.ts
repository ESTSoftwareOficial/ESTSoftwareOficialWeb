import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CourseHeaderComponent } from '../../components/course-header/course-header.component';
import { ModuleTimelineComponent, Module } from '../../components/module-timeline/module-timeline.component';
import { CoursePricingComponent } from '../../components/course-pricing/course-pricing.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CourseHeaderComponent, ModuleTimelineComponent, CoursePricingComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  courseName: string = '';
  courseTitle: string = 'Curso Completo de Angular desde Cero';
  courseImage: string = 'https://res.cloudinary.com/dzndokn0t/image/upload/v1766792659/courses/y5mc6vcusqcnoydltg59.webp';
  courseDescription: string = 'Aprende Angular desde los fundamentos hasta conceptos avanzados. Construye aplicaciones web modernas y escalables con el framework más popular de Google.';
  publishDate: string = '15 de Enero, 2025';
  courseLevel: string = 'Principiante';
  totalModules: number = 12;

  originalPrice: number = 213;
  discountedPrice: number = 167;
  monthlyPrice: number = 369;

  modules: Module[] = [
    {
      id: 1,
      title: 'Introducción a Angular',
      description: 'Conoce qué es Angular, su arquitectura y configura tu entorno de desarrollo',
      lessons: 5,
      duration: 45,
      thumbnailUrl: 'https://i.ytimg.com/vi/3qBXWUpoPHo/mqdefault.jpg'
    },
    {
      id: 2,
      title: 'Componentes y Templates',
      description: 'Aprende a crear componentes, trabajar con templates y databinding',
      lessons: 8,
      duration: 120,
      thumbnailUrl: 'https://i.ytimg.com/vi/3qBXWUpoPHo/mqdefault.jpg'
    },
    {
      id: 3,
      title: 'Directivas y Pipes',
      description: 'Domina las directivas estructurales, de atributo y crea pipes personalizados',
      lessons: 6,
      duration: 90,
      thumbnailUrl: 'https://i.ytimg.com/vi/3qBXWUpoPHo/mqdefault.jpg'
    },
    {
      id: 4,
      title: 'Servicios e Inyección de Dependencias',
      description: 'Implementa servicios para compartir lógica y datos entre componentes',
      lessons: 7,
      duration: 105,
      thumbnailUrl: 'https://i.ytimg.com/vi/3qBXWUpoPHo/mqdefault.jpg'
    },
    {
      id: 5,
      title: 'Routing y Navegación',
      description: 'Crea aplicaciones SPA con múltiples vistas y navegación entre ellas',
      lessons: 9,
      duration: 135,
      thumbnailUrl: 'https://i.ytimg.com/vi/3qBXWUpoPHo/mqdefault.jpg'
    }
  ];

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