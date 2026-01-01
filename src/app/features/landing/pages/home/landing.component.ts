import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TechLanguagesGridComponent } from "../../components/tech-languages-grid/tech-languages-grid.component";
import { LinuxLearningSectionComponent } from "../../components/linux-learning-section/linux-learning-section.component";
import { GithubLearningComponent } from "../../components/github-learning/github-learning.component";
import { LearningPathComponent } from "../../components/learning-path/learning-path.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, HeaderComponent, TechLanguagesGridComponent, LinuxLearningSectionComponent, GithubLearningComponent, LearningPathComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
