import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LogIn, Eye, EyeOff } from 'lucide-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertComponent, ModalType } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly LogIn = LogIn;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  
  isHovered = false;
  showPassword = false;
  
  email = '';
  password = '';
  rememberMe = false;
  
  isLoading = false;
  
  showModal = false;
  modalType: ModalType = 'info';
  modalTitle = '';
  modalMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.showErrorModal('Por favor completa todos los campos');
      return;
    }

    this.isLoading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        this.showSuccessModal();
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        this.showErrorModal(error.error?.error || 'Error al iniciar sesión');
      }
    });
  }

  showSuccessModal() {
    this.modalType = 'success';
    this.modalTitle = '¡Bienvenido!';
    this.modalMessage = 'Has iniciado sesión correctamente. Redirigiendo al dashboard...';
    this.showModal = true;
  }

  showErrorModal(message: string) {
    this.modalType = 'error';
    this.modalTitle = 'Error';
    this.modalMessage = message;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
    
    if (this.modalType === 'success') {
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 500);
    }
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