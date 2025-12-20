# 🎓 Plataforma de Cursos Online

Plataforma para vender y gestionar cursos online con **Angular 18** y **Arquitectura Híbrida**.

---

## 📂 Estructura del Proyecto

```
src/app/
├── features/                    ← FUNCIONALIDADES
│   ├── auth/                   ← Autenticación
│   │   ├── domain/             ← Modelos (interfaces)
│   │   ├── services/           ← Lógica + HTTP
│   │   ├── guards/             ← Protección
│   │   ├── components/         ← UI
│   │   └── auth.routes.ts
│   ├── payments/               ← Pagos
│   ├── courses/                ← Cursos
│   └── users/                  ← Usuarios
│
├── shared/                      ← REUTILIZABLE
│   ├── components/             ← Botones, cards, etc
│   ├── interceptors/           ← HTTP global
│   ├── guards/                 ← Guards compartidos
│   ├── pipes/                  ← Pipes personalizados
│   └── utils/                  ← Helpers
│
└── core/                        ← SERVICIOS GLOBALES
    └── services/               ← Notificaciones, etc
```

---

## 🎯 Capas de la Arquitectura

### 📁 **DOMAIN** - Modelos e Interfaces
**Ubicación:** `features/{nombre}/domain/`

**¿Qué va aquí?**
- Interfaces TypeScript
- Enums
- Types

**Ejemplo:**
```typescript
// features/courses/domain/course.model.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructorId: string;
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}
```

---

### 🛠️ **SERVICES** - Lógica + HTTP
**Ubicación:** `features/{nombre}/services/`

**¿Qué va aquí?**
- Peticiones HTTP
- Lógica de negocio
- Validaciones
- Estado (BehaviorSubject)

**Ejemplo:**
```typescript
// features/courses/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from '../domain/course.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;
  
  // Estado reactivo
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener cursos
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      tap(courses => this.coursesSubject.next(courses))
    );
  }

  // Crear curso
  createCourse(course: Partial<Course>): Observable<Course> {
    // Validaciones
    if (!course.title || course.title.length < 3) {
      throw new Error('Título inválido');
    }

    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => {
        const current = this.coursesSubject.value;
        this.coursesSubject.next([...current, newCourse]);
      })
    );
  }

  // Comprar curso
  buyCourse(courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/buy`, {});
  }
}
```

---

### 🎨 **COMPONENTS** - UI
**Ubicación:** `features/{nombre}/components/`

**¿Qué va aquí?**
- Lógica de presentación
- Manejo de formularios
- Interacción con usuario

**Ejemplo:**
```typescript
// features/courses/components/course-list/course-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../domain/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  isLoading = false;
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.courses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewCourse(courseId: string): void {
    this.router.navigate(['/courses', courseId]);
  }

  buyCourse(courseId: string): void {
    this.courseService.buyCourse(courseId).subscribe({
      next: () => {
        alert('Curso comprado exitosamente');
      },
      error: (error) => {
        alert('Error al comprar: ' + error.message);
      }
    });
  }
}
```

---

### 🛡️ **GUARDS** - Protección de Rutas
**Ubicación:** `features/{nombre}/guards/` o `shared/guards/`

**¿Qué va aquí?**
- Validar autenticación
- Validar roles
- Redireccionar

**Ejemplo:**
```typescript
// features/auth/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};
```

**Uso en rutas:**
```typescript
// app.routes.ts
{
  path: 'courses',
  canActivate: [authGuard],
  loadChildren: () => import('./features/courses/courses.routes')
}
```

---

### 🔌 **INTERCEPTORS** - HTTP Global
**Ubicación:** `shared/interceptors/`

**¿Qué va aquí?**
- Agregar headers (JWT)
- Manejo de errores
- Loading global

**Ejemplo:**
```typescript
// shared/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
```

**Configurar en app.config.ts:**
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
```

---

## ➕ Agregar Nuevas Funcionalidades

### 🆕 **1. Crear un Nuevo Feature**

```bash
# Componentes
ng g c features/reviews/components/review-list --skip-tests
ng g c features/reviews/components/review-form --skip-tests

# Services
ng g s features/reviews/services/review --skip-tests

# Crear carpeta domain
mkdir -p src/app/features/reviews/domain

# Crear archivos manuales
touch src/app/features/reviews/domain/review.model.ts
touch src/app/features/reviews/reviews.routes.ts
```

**Crear modelo:**
```typescript
// features/reviews/domain/review.model.ts
export interface Review {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
```

**Crear service:**
```typescript
// features/reviews/services/review.service.ts
@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviewsByCourse(courseId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/course/${courseId}`);
  }

  createReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }
}
```

**Crear rutas:**
```typescript
// features/reviews/reviews.routes.ts
import { Routes } from '@angular/router';

export const REVIEWS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/review-list/review-list.component')
      .then(m => m.ReviewListComponent)
  }
];
```

**Conectar en app.routes.ts:**
```typescript
{
  path: 'reviews',
  loadChildren: () => import('./features/reviews/reviews.routes')
    .then(m => m.REVIEWS_ROUTES)
}
```

---

### 🎨 **2. Agregar Componente Reutilizable**

```bash
ng g c shared/components/modal --skip-tests
```

**Usar en cualquier componente:**
```html
<app-modal [isOpen]="showModal" (close)="closeModal()">
  <h2>Título del Modal</h2>
  <p>Contenido aquí</p>
</app-modal>
```

---

### 🎨 **3. Agregar Pipe Personalizado**

```bash
ng g pipe shared/pipes/currency-mxn --skip-tests
```

```typescript
@Pipe({ name: 'currencyMxn' })
export class CurrencyMxnPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  }
}
```

**Usar en templates:**
```html
<p>Precio: {{ course.price | currencyMxn }}</p>
```

---

### 🛡️ **4. Agregar Guard para Roles**

```bash
ng g guard shared/guards/role --skip-tests
```

```typescript
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const user = authService.getCurrentUser();
    
    if (user && allowedRoles.includes(user.role)) {
      return true;
    }
    
    return false;
  };
};
```

**Usar en rutas:**
```typescript
{
  path: 'admin',
  canActivate: [roleGuard(['ADMIN', 'INSTRUCTOR'])],
  loadComponent: () => import('./admin/admin.component')
}
```

---

### 🔧 **5. Agregar Utilidad/Helper**

```typescript
// shared/utils/format.utils.ts
export class FormatUtils {
  static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX').format(date);
  }

  static truncateText(text: string, maxLength: number): string {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  }
}
```

**Usar en services o components:**
```typescript
import { FormatUtils } from '../../../shared/utils/format.utils';

const formattedDate = FormatUtils.formatDate(new Date());
```

---

## 🔄 Flujo de Datos Típico

```
1. Usuario hace click en botón
   ↓
2. Component captura evento y llama a service
   ↓
3. Service valida y hace petición HTTP
   ↓
4. Interceptor agrega JWT token automáticamente
   ↓
5. Backend procesa y responde
   ↓
6. Service recibe respuesta y actualiza estado
   ↓
7. Component se actualiza automáticamente (Observable)
   ↓
8. Vista se re-renderiza
```

---

## 📋 Reglas Importantes

### ✅ **SÍ HACER:**
- Un service por feature
- Interfaces en `domain/`
- HTTP solo en services
- Validaciones en services
- Loading states en components
- Manejo de errores siempre

### ❌ **NO HACER:**
- HTTP directamente en components
- Lógica de negocio en components
- Services gigantes (dividir si pasa 500 líneas)
- Ignorar errores
- Magic numbers (usar constants.ts)

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
ng serve

# Build producción
ng build --configuration production

# Generar componente
ng g c features/{feature}/components/{nombre} --skip-tests

# Generar service
ng g s features/{feature}/services/{nombre} --skip-tests

# Generar guard
ng g guard features/{feature}/guards/{nombre} --skip-tests

# Generar interceptor
ng g interceptor shared/interceptors/{nombre} --skip-tests

# Generar pipe
ng g pipe shared/pipes/{nombre} --skip-tests
```

---

## 📚 Tecnologías

- Angular 18
- TypeScript 5.4
- RxJS (Observables)
- Stripe (Pagos)
- CSS puro

---

## 👨‍💻 Autor

**Ameth**