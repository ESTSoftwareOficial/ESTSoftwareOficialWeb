import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  stats = [
    { label: 'Cursos Completados', value: '12', icon: '✅', color: 'from-green-500 to-emerald-600' },
    { label: 'Cursos en Progreso', value: '5', icon: '📚', color: 'from-blue-500 to-cyan-600' },
    { label: 'Horas de Aprendizaje', value: '156', icon: '⏱️', color: 'from-purple-500 to-pink-600' },
    { label: 'Certificados', value: '8', icon: '🏆', color: 'from-orange-500 to-red-600' },
  ];

  recentActivity = [
    { course: 'Angular Avanzado', action: 'Completaste el módulo 3', time: 'Hace 2 horas', icon: '🎯' },
    { course: 'TypeScript Pro', action: 'Iniciaste el curso', time: 'Hace 1 día', icon: '📘' },
    { course: 'Node.js Backend', action: 'Completaste el curso', time: 'Hace 3 días', icon: '🎓' },
    { course: 'React Fundamentals', action: 'Alcanzaste 50% de progreso', time: 'Hace 5 días', icon: '⚛️' },
  ];

  quickActions = [
    { title: 'Continuar Aprendiendo', description: 'Retoma donde lo dejaste', icon: '🎯', color: 'from-blue-500 to-blue-600' },
    { title: 'Explorar Cursos', description: 'Descubre nuevo contenido', icon: '🔍', color: 'from-purple-500 to-purple-600' },
    { title: 'Ver Progreso', description: 'Revisa tus estadísticas', icon: '📊', color: 'from-green-500 to-green-600' },
  ];
}