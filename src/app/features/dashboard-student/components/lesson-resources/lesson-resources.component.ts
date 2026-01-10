import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Resource {
  id: number;
  title: string;
  description: string;
  platform: 'github' | 'figma' | 'drive' | 'docs' | 'mediafire';
  url: string;
}

@Component({
  selector: 'app-lesson-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-resources.component.html',
  styleUrl: './lesson-resources.component.css'
})
export class LessonResourcesComponent {
  @Input() lessonId = 0;

  resources: Resource[] = [
    {
      id: 1,
      title: 'Código del proyecto',
      description: 'Hola chicos les comparto el enlace de la práctica de Java, les dejo el link del repositorio',
      platform: 'github',
      url: 'https://github.com'
    },
    {
      id: 2,
      title: 'Diseño de interfaces',
      description: 'Aquí encontrarás todos los diseños y prototipos del proyecto en Figma',
      platform: 'figma',
      url: 'https://figma.com'
    },
    {
      id: 3,
      title: 'Material del curso',
      description: 'PDFs, presentaciones y recursos adicionales almacenados en Google Drive',
      platform: 'drive',
      url: 'https://drive.google.com'
    },
    {
      id: 4,
      title: 'Documentación oficial',
      description: 'Documentación completa y guías de referencia del framework',
      platform: 'docs',
      url: 'https://docs.angular.io'
    },
    {
      id: 5,
      title: 'Archivos pesados',
      description: 'Videos y recursos de gran tamaño disponibles para descarga directa',
      platform: 'mediafire',
      url: 'https://mediafire.com'
    }
  ];

  //
  getPlatformInfo(platform: string) {
    const platforms = {
      github: {
        name: 'GitHub',
        icon: 'https://cdn.simpleicons.org/github/white'
      },
      figma: {
        name: 'Figma',
        icon: 'https://cdn.simpleicons.org/figma/white'
      },
      drive: {
        name: 'Google Drive',
        icon: 'https://cdn.simpleicons.org/googledrive/white'
      },
      docs: {
        name: 'Documentación',
        icon: 'https://cdn.simpleicons.org/readme/white'
      },
      mediafire: {
        name: 'MediaFire',
        icon: 'https://cdn.simpleicons.org/mediafire/white'
      }
    };
    return platforms[platform as keyof typeof platforms];
  }

  openResource(url: string) {
    window.open(url, '_blank');
  }
}