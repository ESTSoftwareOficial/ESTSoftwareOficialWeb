import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../domain/user.model';
import { LoginRequest } from '../domain/dto/login/login.request';
import { LoginResponse } from '../domain/dto/login/login.response';
import { RegisterRequest } from '../domain/dto/register/register.request';
import { AuthResponse } from '../domain/dto/auth.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuth();
  }

  checkAuth(): void {
    this.http.get<{ authenticated: boolean; user: User }>(`${this.apiUrl}/verify`, {
      withCredentials: true
    }).subscribe({
      next: (response) => {
        this.isAuthenticated.set(response.authenticated);
        this.currentUserSubject.next(response.user);
      },
      error: () => {
        this.isAuthenticated.set(false);
        this.currentUserSubject.next(null);
      }
    });
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData, {
      withCredentials: true
    }).pipe(
      tap((response) => {
        this.isAuthenticated.set(true);
        this.currentUserSubject.next(response.user);
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  register(registerData: RegisterRequest, photo?: File): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('firstName', registerData.firstName);
    formData.append('secondName', registerData.secondName);
    formData.append('lastName', registerData.lastName);
    formData.append('secondLastName', registerData.secondLastName);
    formData.append('email', registerData.email);
    formData.append('password', registerData.password);
    formData.append('roleId', registerData.roleId.toString());

    if (registerData.secondaryEmail) {
      formData.append('secondaryEmail', registerData.secondaryEmail);
    }

    if (photo) {
      formData.append('profilePhoto', photo);
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, formData, {
      withCredentials: true
    }).pipe(
      tap((response) => {
        console.log('Usuario registrado:', response);
      }),
      catchError((error) => {
        console.error('Error en registro:', error);
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/refresh`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        console.log('Token renovado');
      }),
      catchError((error) => {
        console.error('Error al renovar token:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isAuthenticated.set(false);
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        console.error('Error en logout:', error);
        return throwError(() => error);
      })
    );
  }

  getProfile(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/profile`, {
      withCredentials: true
    }).pipe(
      tap((response) => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}