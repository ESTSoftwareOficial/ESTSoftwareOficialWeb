import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, User, Mail, Globe, Bell, Lock, AlertTriangle, Camera, Calendar, Briefcase, ExternalLink, X, ChevronDown, Search } from 'lucide-angular';

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface UserProfile {
  firstName: string;
  secondName: string;
  paternalLastName: string;
  maternalLastName: string;
  profileImage: string;
  email: string;
  emailTags: string[];
  phone: string;
  phoneCountryCode: string;
  occupation: string;
  role: string;
  joinedDate: Date;
  socialLinks: {
    github: string;
    linkedin: string;
    portfolio: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  readonly User = User;
  readonly Mail = Mail;
  readonly Globe = Globe;
  readonly Bell = Bell;
  readonly Lock = Lock;
  readonly AlertTriangle = AlertTriangle;
  readonly Camera = Camera;
  readonly Calendar = Calendar;
  readonly Briefcase = Briefcase;
  readonly ExternalLink = ExternalLink;
  readonly X = X;
  readonly ChevronDown = ChevronDown;
  readonly Search = Search;

  showCountryDropdown = false;
  selectedCountry: Country;
  countrySearchTerm = '';
  filteredCountries: Country[] = [];

  countries: Country[] = [
    { name: 'México', code: 'MX', dialCode: '+52', flag: 'https://flagcdn.com/w40/mx.png' },
    { name: 'Estados Unidos', code: 'US', dialCode: '+1', flag: 'https://flagcdn.com/w40/us.png' },
    { name: 'España', code: 'ES', dialCode: '+34', flag: 'https://flagcdn.com/w40/es.png' },
    { name: 'Argentina', code: 'AR', dialCode: '+54', flag: 'https://flagcdn.com/w40/ar.png' },
    { name: 'Colombia', code: 'CO', dialCode: '+57', flag: 'https://flagcdn.com/w40/co.png' },
    { name: 'Chile', code: 'CL', dialCode: '+56', flag: 'https://flagcdn.com/w40/cl.png' },
    { name: 'Perú', code: 'PE', dialCode: '+51', flag: 'https://flagcdn.com/w40/pe.png' },
    { name: 'Venezuela', code: 'VE', dialCode: '+58', flag: 'https://flagcdn.com/w40/ve.png' },
    { name: 'Ecuador', code: 'EC', dialCode: '+593', flag: 'https://flagcdn.com/w40/ec.png' },
    { name: 'Guatemala', code: 'GT', dialCode: '+502', flag: 'https://flagcdn.com/w40/gt.png' },
    { name: 'Cuba', code: 'CU', dialCode: '+53', flag: 'https://flagcdn.com/w40/cu.png' },
    { name: 'Bolivia', code: 'BO', dialCode: '+591', flag: 'https://flagcdn.com/w40/bo.png' },
    { name: 'República Dominicana', code: 'DO', dialCode: '+1-809', flag: 'https://flagcdn.com/w40/do.png' },
    { name: 'Honduras', code: 'HN', dialCode: '+504', flag: 'https://flagcdn.com/w40/hn.png' },
    { name: 'Paraguay', code: 'PY', dialCode: '+595', flag: 'https://flagcdn.com/w40/py.png' },
    { name: 'El Salvador', code: 'SV', dialCode: '+503', flag: 'https://flagcdn.com/w40/sv.png' },
    { name: 'Nicaragua', code: 'NI', dialCode: '+505', flag: 'https://flagcdn.com/w40/ni.png' },
    { name: 'Costa Rica', code: 'CR', dialCode: '+506', flag: 'https://flagcdn.com/w40/cr.png' },
    { name: 'Panamá', code: 'PA', dialCode: '+507', flag: 'https://flagcdn.com/w40/pa.png' },
    { name: 'Uruguay', code: 'UY', dialCode: '+598', flag: 'https://flagcdn.com/w40/uy.png' },
    { name: 'Puerto Rico', code: 'PR', dialCode: '+1-787', flag: 'https://flagcdn.com/w40/pr.png' }
  ];

  user: UserProfile = {
    firstName: 'Ameth',
    secondName: 'de Jesus',
    paternalLastName: 'Mendez',
    maternalLastName: 'Toledo',
    profileImage: 'assets/ameth.png',
    email: 'shakerzest@gmail.com',
    emailTags: [],
    phone: '9611234567',
    phoneCountryCode: '+52',
    occupation: '',
    role: '',
    joinedDate: new Date('2024-01-15'),
    socialLinks: {
      github: '',
      linkedin: '',
      portfolio: '',
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: '',
      tiktok: ''
    }
  };

  notifications = {
    email: true,
    push: false,
    sms: false
  };

  constructor() {
    this.selectedCountry = this.countries[0];
    this.filteredCountries = this.countries;
  }

  roleOptions = [
    { value: '', label: 'Selecciona un rol' },
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Full Stack Developer' },
    { value: 'mobile', label: 'Mobile Developer' },
    { value: 'ios', label: 'iOS Developer' },
    { value: 'android', label: 'Android Developer' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'data', label: 'Data Engineer' },
    { value: 'ml', label: 'Machine Learning Engineer' },
    { value: 'ai', label: 'AI Engineer' },
    { value: 'ui-ux', label: 'UI/UX Designer' },
    { value: 'qa', label: 'QA Engineer' },
    { value: 'security', label: 'Security Engineer' },
    { value: 'cloud', label: 'Cloud Architect' },
    { value: 'dba', label: 'Database Administrator' },
    { value: 'pm', label: 'Product Manager' },
    { value: 'scrum', label: 'Scrum Master' },
    { value: 'tech-lead', label: 'Tech Lead' },
    { value: 'architect', label: 'Software Architect' }
  ];

  occupationOptions = [
    { value: '', label: 'Selecciona una ocupación' },
    { value: 'ing-software', label: 'Ingeniero en Software' },
    { value: 'ing-sistemas', label: 'Ingeniero en Sistemas' },
    { value: 'ing-computacion', label: 'Ingeniero en Computación' },
    { value: 'ing-telematica', label: 'Ingeniero en Telemática' },
    { value: 'lic-informatica', label: 'Licenciado en Informática' },
    { value: 'dev-web', label: 'Desarrollador Web' },
    { value: 'dev-mobile', label: 'Desarrollador Mobile' },
    { value: 'analista-datos', label: 'Analista de Datos' },
    { value: 'cientifico-datos', label: 'Científico de Datos' },
    { value: 'arquitecto-software', label: 'Arquitecto de Software' },
    { value: 'consultor-it', label: 'Consultor IT' },
    { value: 'disenador-ux', label: 'Diseñador UX/UI' },
    { value: 'admin-sistemas', label: 'Administrador de Sistemas' },
    { value: 'estudiante', label: 'Estudiante' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'emprendedor', label: 'Emprendedor' }
  ];

  emailDomainSuggestions = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'icloud.com',
    'protonmail.com'
  ];

  toggleCountryDropdown() {
    this.showCountryDropdown = !this.showCountryDropdown;
    if (this.showCountryDropdown) {
      this.countrySearchTerm = '';
      this.filteredCountries = this.countries;
    }
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.user.phoneCountryCode = country.dialCode;
    this.showCountryDropdown = false;
    this.countrySearchTerm = '';
  }

  filterCountries() {
    const searchTerm = this.countrySearchTerm.toLowerCase().trim();
    
    if (!searchTerm) {
      this.filteredCountries = this.countries;
      return;
    }

    this.filteredCountries = this.countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) || 
      country.dialCode.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm)
    );
  }

  addEmailDomain(domain: string) {
    if (this.user.email && !this.user.email.includes('@')) {
      this.user.email = this.user.email + '@' + domain;
    }
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.user.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  }

  getFullName(): string {
    const parts = [
      this.user.firstName,
      this.user.secondName,
      this.user.paternalLastName,
      this.user.maternalLastName
    ].filter(part => part.trim() !== '');
    
    return parts.join(' ') || 'Usuario';
  }

  onSave() {
    console.log('Guardando perfil:', this.user);
    alert('Perfil actualizado correctamente');
  }

  onDeleteAccount() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Eliminando cuenta...');
      alert('Cuenta eliminada');
    }
  }
}