import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent, TimelineEntry } from '../timeline/timeline.component';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule, TimelineComponent],
  templateUrl: './learning-path.component.html',
  styleUrl: './learning-path.component.css'
})
export class LearningPathComponent {
  timelineData: TimelineEntry[] = [
    {
      title: 'Frontend',
      content: {
        description: [
          'Domina las tecnologías modernas de desarrollo frontend y crea interfaces de usuario increíbles.',
          'Aprende frameworks populares como Angular, React y Vue.js con las mejores prácticas del mercado.'
        ],
        items: [
          'HTML5 y CSS3 avanzado',
          'JavaScript moderno (ES6+)',
          'TypeScript profesional',
          'Angular, React o Vue.js',
          'TailwindCSS y diseño responsive',
          'Animaciones y transiciones'
        ],
        images: [
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
          'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
          'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
          'https://ameth-toledo.github.io/recursos/imagenes/9.webp'
        ]
      }
    },
    {
      title: 'Backend',
      content: {
        description: [
          'Construye APIs robustas y escalables con las tecnologías backend más demandadas.',
          'Aprende arquitectura de software, patrones de diseño y mejores prácticas de desarrollo.'
        ],
        items: [
          'Node.js y Express',
          'Python con Django/FastAPI',
          'NestJS para aplicaciones enterprise',
          'APIs RESTful y GraphQL',
          'Autenticación y autorización (JWT, OAuth)',
          'Microservicios y arquitectura limpia'
        ],
        images: [
          'https://ameth-toledo.github.io/recursos/imagenes/6.webp',
          'https://ameth-toledo.github.io/recursos/imagenes/11.webp',
          'https://ameth-toledo.github.io/recursos/imagenes/10.webp',
          'https://ameth-toledo.github.io/recursos/imagenes/5.webp'
        ]
      }
    },
    {
      title: 'Base de Datos',
      content: {
        description: [
          'Domina el diseño, optimización y administración de bases de datos relacionales y NoSQL.',
          'Aprende a crear esquemas eficientes y consultas optimizadas para aplicaciones de alto rendimiento.'
        ],
        items: [
          'PostgreSQL y MySQL',
          'MongoDB y bases de datos NoSQL',
          'Diseño de esquemas y normalización',
          'Optimización de queries e índices',
          'Transacciones y ACID',
          'Redis para caché y sessions'
        ],
        images: [
          'https://ameth-toledo.github.io/recursos/imagenes/1.webp',
          'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
          'https://images.unsplash.com/photo-1542903660-eedba2cda473',
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31'
        ]
      }
    },
    {
      title: 'DevOps',
      content: {
        description: [
          'Automatiza despliegues y gestiona infraestructura como código con las herramientas más usadas.',
          'Aprende containerización, orquestación y las mejores prácticas de CI/CD.'
        ],
        items: [
          'Docker y Kubernetes',
          'CI/CD con GitHub Actions y Jenkins',
          'Terraform para infraestructura',
          'Monitoreo con Prometheus y Grafana',
          'AWS, Azure o Google Cloud Platform',
          'Seguridad y mejores prácticas'
        ],
        images: [
          'https://ameth-toledo.github.io/recursos/imagenes/2.webp',
          'https://ameth-toledo.github.io/recursos/imagenes/8.webp',
          'https://ameth-toledo.github.io/recursos/imagenes/3.webp',
          'https://ameth-toledo.github.io/recursos/imagenes/1.webp'
        ]
      }
    },
    {
      title: 'Pruebas',
      content: {
        description: [
          'Asegura la calidad de tu código con testing automatizado y metodologías de QA profesionales.',
          'Aprende a escribir tests unitarios, de integración y end-to-end efectivos.'
        ],
        items: [
          'Testing unitario con Jest y Vitest',
          'Testing de integración',
          'E2E testing con Cypress y Playwright',
          'TDD (Test-Driven Development)',
          'Code coverage y calidad de código',
          'Testing de APIs y performance'
        ],
        images: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
          'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
          'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a'
        ]
      }
    }
  ];
}