import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimatedTooltipComponent, TooltipItem } from '../animated-tooltip/animated-tooltip.component';
import { TechStackComponent } from "../tech-stack/tech-stack.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AnimatedTooltipComponent, TechStackComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  instructors: TooltipItem[] = [
    {
      id: 1,
      name: "Ameth Toledo",
      designation: "Instructor de FullStack",
      image: "assets/ameth.png"
    },
    {
      id: 2,
      name: "Jared Torres",
      designation: "Desarrollador Frontend && UI/UX",
      image: "assets/jared.jpeg"
    },
    {
      id: 3,
      name: "Edy Jordan",
      designation: "Desarrollador Backend",
      image: "assets/edy.jpeg"
    },
    {
      id: 4,
      name: "Fabricio Perez",
      designation: "Instructor FullStack",
      image: "assets/fabricio.jpeg"
    },
    {
      id: 5,
      name: "Ivan Giron",
      designation: "Desarrollador Frontend",
      image: "assets/ivan.jpeg"
    },
    {
      id: 6,
      name: "Laura Martínez",
      designation: "Instructora de Mobile",
      image: "https://i.pravatar.cc/150?img=44"
    }
  ];

  constructor(private router: Router) {}

  onExploreCourses(): void {
    this.router.navigate(['/courses']);
  }

  onGetStarted(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/auth/register']);
  }
}