import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechBadge {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.css']
})
export class TechStackComponent {
  technologies: TechBadge[] = [
    { 
      name: 'npm', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg'
    },
    { 
      name: 'Angular', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg'
    },
    { 
      name: 'TailwindCSS', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
    },
    { 
      name: 'Framer Motion', 
      icon: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg'
    }
  ];
}