import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { LoaderComponent } from "../../../../shared/components/loader/loader.component";
import { CourseCard, CourseCarouselComponent } from '../../../../shared/components/course-carousel/course-carousel.component';
import { CommonModule } from '@angular/common';

interface CourseCategory {
  title: string;
  courses: CourseCard[];
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoaderComponent, CourseCarouselComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseCategories: CourseCategory[] = [
    {
      title: 'Desarrollo Web',
      courses: [
        {
          category: 'Desarrollo Web',
          title: 'Domina Angular desde cero',
          src: 'https://ionic.io/blog/wp-content/uploads/2024/02/angular-feature-image-1-1024x512.png',
          content: 'Aprende Angular desde los fundamentos hasta aplicaciones empresariales completas con las mejores prácticas del mercado.',
          rating: 4.5,
          level: 'Intermedio',
          modules: 15,
          instructor: 'Ameth Toledo'
        },
        {
          category: 'Desarrollo Web',
          title: 'React Avanzado',
          src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
          content: 'Domina React con hooks, context API, y patrones de diseño modernos.',
          rating: 4.9,
          level: 'Avanzado',
          modules: 18
        },
        {
          category: 'Desarrollo Web',
          title: 'Vue.js Completo',
          src: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
          content: 'Aprende Vue.js 3 con Composition API, Pinia y las últimas características del framework.',
          rating: 4.7,
          level: 'Intermedio',
          modules: 14
        },
        {
          category: 'Desarrollo Web',
          title: 'TypeScript Profesional',
          src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
          content: 'Domina TypeScript y lleva tu código JavaScript al siguiente nivel con tipado estático.',
          rating: 4.6,
          level: 'Intermedio',
          modules: 10
        },
        {
          category: 'Desarrollo Web',
          title: 'TailwindCSS Master',
          src: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2',
          content: 'Crea interfaces modernas y responsive con TailwindCSS y las mejores prácticas de diseño.',
          rating: 4.5,
          level: 'Básico',
          modules: 8
        }
      ]
    },
    {
      title: 'Backend',
      courses: [
        {
          category: 'Backend',
          title: 'Node.js y APIs RESTful',
          src: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
          content: 'Construye APIs escalables y seguras con Node.js, Express y bases de datos modernas.',
          rating: 4.8,
          level: 'Intermedio',
          modules: 16
        },
        {
          category: 'Backend',
          title: 'Python Django Avanzado',
          src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
          content: 'Desarrolla aplicaciones web robustas con Django y Python para backend empresarial.',
          rating: 4.7,
          level: 'Avanzado',
          modules: 20
        },
        {
          category: 'Backend',
          title: 'Go para Microservicios',
          src: 'https://images.unsplash.com/photo-1562813733-b31f71025d54',
          content: 'Aprende Go y construye microservicios de alto rendimiento y escalables.',
          rating: 4.9,
          level: 'Avanzado',
          modules: 18
        },
        {
          category: 'Backend',
          title: 'NestJS Framework',
          src: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b',
          content: 'Domina NestJS para crear aplicaciones backend enterprise con arquitectura limpia.',
          rating: 4.6,
          level: 'Intermedio',
          modules: 14
        },
        {
          category: 'Backend',
          title: 'GraphQL APIs',
          src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
          content: 'Construye APIs modernas con GraphQL, Apollo Server y las mejores prácticas.',
          rating: 4.5,
          level: 'Avanzado',
          modules: 12
        }
      ]
    },
    {
      title: 'Base de Datos',
      courses: [
        {
          category: 'Base de Datos',
          title: 'PostgreSQL Avanzado',
          src: 'https://www.todopostgresql.com/wp-content/uploads/2019/03/logo_tpg_archivos.png',
          content: 'Aprende optimización de queries, índices, transacciones y arquitectura de bases de datos relacionales.',
          rating: 4.9,
          level: 'Avanzado',
          modules: 16
        },
        {
          category: 'Base de Datos',
          title: 'MongoDB Master',
          src: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
          content: 'Domina MongoDB para bases de datos NoSQL escalables y de alto rendimiento.',
          rating: 4.7,
          level: 'Intermedio',
          modules: 14
        },
        {
          category: 'Base de Datos',
          title: 'MySQL Profesional',
          src: 'https://images.unsplash.com/photo-1542903660-eedba2cda473',
          content: 'Aprende MySQL desde lo básico hasta optimización avanzada y administración.',
          rating: 4.6,
          level: 'Intermedio',
          modules: 13
        },
        {
          category: 'Base de Datos',
          title: 'Redis y Caché',
          src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
          content: 'Implementa sistemas de caché eficientes con Redis para aplicaciones de alta demanda.',
          rating: 4.5,
          level: 'Intermedio',
          modules: 10
        },
        {
          category: 'Base de Datos',
          title: 'Diseño de Bases de Datos',
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          content: 'Aprende a diseñar esquemas de bases de datos normalizados y eficientes.',
          rating: 4.8,
          level: 'Básico',
          modules: 12
        }
      ]
    },
    {
      title: 'DevOps',
      courses: [
        {
          category: 'DevOps',
          title: 'Docker y Kubernetes',
          src: 'https://images.unsplash.com/photo-1605745341112-85968b19335b',
          content: 'Domina la containerización y orquestación de aplicaciones para despliegues profesionales.',
          rating: 4.9,
          level: 'Avanzado',
          modules: 20
        },
        {
          category: 'DevOps',
          title: 'CI/CD con Jenkins',
          src: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
          content: 'Automatiza tus despliegues con Jenkins, GitHub Actions y pipelines modernos.',
          rating: 4.7,
          level: 'Intermedio',
          modules: 15
        },
        {
          category: 'DevOps',
          title: 'Terraform Infrastructure',
          src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
          content: 'Gestiona infraestructura como código con Terraform en AWS, Azure y GCP.',
          rating: 4.8,
          level: 'Avanzado',
          modules: 18
        },
        {
          category: 'DevOps',
          title: 'Monitoreo con Prometheus',
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          content: 'Implementa sistemas de monitoreo y alertas con Prometheus y Grafana.',
          rating: 4.6,
          level: 'Intermedio',
          modules: 12
        },
        {
          category: 'DevOps',
          title: 'AWS Cloud Practitioner',
          src: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2',
          content: 'Domina AWS y aprende a desplegar aplicaciones en la nube más popular.',
          rating: 4.8,
          level: 'Intermedio',
          modules: 22
        }
      ]
    },
    {
      title: 'Sistemas Operativos',
      courses: [
        {
          category: 'Sistemas Operativos',
          title: 'Linux para Desarrolladores',
          src: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97',
          content: 'Domina la terminal, bash scripting, administración de servidores y automatización en Linux.',
          rating: 4.9,
          level: 'Intermedio',
          modules: 18
        },
        {
          category: 'Sistemas Operativos',
          title: 'Bash Scripting Avanzado',
          src: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a',
          content: 'Automatiza tareas complejas con scripts de bash profesionales y eficientes.',
          rating: 4.7,
          level: 'Avanzado',
          modules: 14
        },
        {
          category: 'Sistemas Operativos',
          title: 'Administración de Servidores',
          src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
          content: 'Aprende a configurar, mantener y asegurar servidores Linux en producción.',
          rating: 4.8,
          level: 'Avanzado',
          modules: 16
        },
        {
          category: 'Sistemas Operativos',
          title: 'Seguridad en Linux',
          src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
          content: 'Implementa las mejores prácticas de seguridad en sistemas Linux empresariales.',
          rating: 4.6,
          level: 'Avanzado',
          modules: 15
        },
        {
          category: 'Sistemas Operativos',
          title: 'Redes y Protocolos',
          src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
          content: 'Domina TCP/IP, DNS, HTTP y los fundamentos de redes para desarrolladores.',
          rating: 4.5,
          level: 'Intermedio',
          modules: 12
        }
      ]
    }
  ];
}