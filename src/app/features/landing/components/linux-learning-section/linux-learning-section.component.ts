import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../../../../shared/components/terminal/terminal.component';
import { InfiniteMovingCardsComponent } from "../infinite-moving-cards/infinite-moving-cards.component";

@Component({
  selector: 'app-linux-learning-section',
  standalone: true,
  imports: [CommonModule, TerminalComponent, InfiniteMovingCardsComponent],
  templateUrl: './linux-learning-section.component.html',
  styleUrl: './linux-learning-section.component.css'
})
export class LinuxLearningSectionComponent {
  terminalLines = [
    { type: 'typing' as const, content: '$ ls', duration: 60 },
    { type: 'animated' as const, content: 'Documents Downloads Pictures', className: 'text-blue-500', delay: 800 },
    { type: 'typing' as const, content: '$ cd Documents', duration: 60, delay: 1600 },
    { type: 'typing' as const, content: '$ pwd', duration: 60, delay: 2400 },
    { type: 'animated' as const, content: '/home/user/Documents', className: 'text-green-500', delay: 3200 }
  ];

  testimonials = [
    {
      quote: "Git es fundamental para cualquier desarrollador. Aprendí a trabajar en equipo y gestionar proyectos complejos sin miedo a perder código.",
      name: "Git",
      title: "Control de versiones profesional",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
      quote: "Docker revolucionó mi forma de trabajar. Ahora puedo crear entornos de desarrollo idénticos en cualquier máquina en minutos.",
      name: "Docker",
      title: "Containerización y despliegue",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    },
    {
      quote: "Dominar la terminal me hizo 10x más productivo. Automatizo tareas que antes me tomaban horas con simples scripts de bash.",
      name: "Bash",
      title: "Automatización de tareas",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"
    },
    {
      quote: "Linux es el corazón de la infraestructura moderna. Aprender a administrar servidores Linux me convirtió en un desarrollador mucho más completo.",
      name: "Linux",
      title: "Administración de sistemas",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
    },
    {
      quote: "CI/CD cambió completamente mi flujo de trabajo. Ahora cada commit se despliega automáticamente después de pasar todas las pruebas.",
      name: "GitHub Actions",
      title: "Integración y despliegue continuo",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
    },
    {
      quote: "Nginx es increíblemente poderoso. Configurar balanceadores de carga y proxies inversos ya no es un misterio para mí.",
      name: "Nginx",
      title: "Servidores web y balanceo de carga",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
    }
  ];
}