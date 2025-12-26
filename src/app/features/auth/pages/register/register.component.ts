import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, UserPlus, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  readonly UserPlus = UserPlus;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  
  isHovered: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  firstName: string = '';
  secondName: string = '';
  lastName: string = '';
  secondLastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  roleId: number = 1;
  image_profile: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const registerData = {
      firstName: this.firstName,
      secondName: this.secondName,
      lastName: this.lastName,
      secondLastName: this.secondLastName,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
      image_profile: this.image_profile
    };
    
    console.log('Register:', registerData);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  registerWithGoogle() {
    console.log('Register with Google');
  }

  registerWithGithub() {
    console.log('Register with GitHub');
  }

  goToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['auth/login']);
  }

  goToLanding(event: Event) {
    event.preventDefault();
    this.router.navigate(['']);
  }
}