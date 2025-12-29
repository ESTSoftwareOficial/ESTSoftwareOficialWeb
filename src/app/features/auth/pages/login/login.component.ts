import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LogIn, Eye, EyeOff } from 'lucide-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly LogIn = LogIn;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  
  isHovered: boolean = false;
  showPassword: boolean = false;
  
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Error al iniciar sesión';
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle() {
    console.log('Login with Google');
  }

  loginWithGithub() {
    console.log('Login with GitHub');
  }

  forgotPassword() {
    console.log('Forgot password');
  }

  goToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['auth/register']);
  }

  goToLanding(event: Event) {
    event.preventDefault();
    this.router.navigate(['']);
  }
}