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
  @Input() lessonId: number = 0;

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

  getPlatformInfo(platform: string) {
    const platforms = {
      github: {
        name: 'GitHub',
        icon: `<path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`,
        color: '#888'
      },
      figma: {
        name: 'Figma',
        icon: `<path fill="currentColor" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>`,
        color: '#888'
      },
      drive: {
        name: 'Google Drive',
        icon: `<path fill="currentColor" d="M7.71 3.5L1.15 15l3.72 6.5L11.43 10l-3.72-6.5zM14.82 0L7.69 13l3.72 6.5L18.54 7 14.82 0zM8.6 15l-3.72 6.5h13.89L22.5 15H8.6z"/>`,
        color: '#888'
      },
      docs: {
        name: 'Documentación',
        icon: `<path fill="currentColor" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22zM11 2v5a2 2 0 0 1-2 2H4a.5.5 0 0 0-.5.5v1A1.5 1.5 0 0 0 5 12h6a1.5 1.5 0 0 0 1.5-1.5V2.5a.5.5 0 0 0-.5-.5zm2 13H5a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 5 2h5a.5.5 0 0 1 .5.5v1A1.5 1.5 0 0 0 12 5h3a.5.5 0 0 1 .5.5v8a1.5 1.5 0 0 1-1.5 1.5z"/>`,
        color: '#888'
      },
      mediafire: {
        name: 'MediaFire',
        icon: `<path fill="currentColor" d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>`,
        color: '#888'
      }
    };
    return platforms[platform as keyof typeof platforms];
  }

  openResource(url: string) {
    window.open(url, '_blank');
  }
}