import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', title: 'EST Software: Login', component: LoginComponent },
    { path: 'register', title: 'EST Software: Registro' , component: RegisterComponent }
]