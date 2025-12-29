import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, UserPlus, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
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
  roleId: number = 3; 
  profilePhoto: File | null = null;
  
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profilePhoto = file;
      console.log('Foto seleccionada:', file.name);
    }
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios';
      return;
    }

    const registerData = {
      firstName: this.firstName,
      secondName: this.secondName,
      lastName: this.lastName,
      secondLastName: this.secondLastName,
      email: this.email,
      password: this.password,
      roleId: this.roleId
    };

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(registerData, this.profilePhoto || undefined).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.isLoading = false;
        this.successMessage = 'Registro exitoso. Redirigiendo al login...';
        
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Error al registrar usuario';
      }
    });
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