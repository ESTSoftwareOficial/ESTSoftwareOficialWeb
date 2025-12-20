import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TechLanguagesGridComponent } from "../../components/tech-languages-grid/tech-languages-grid.component";
import { LinuxLearningSectionComponent } from "../../components/linux-learning-section/linux-learning-section.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, HeaderComponent, TechLanguagesGridComponent, LinuxLearningSectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
