import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LogIn, Eye, EyeOff } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
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

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Login:', { email: this.email, password: this.password, rememberMe: this.rememberMe });
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