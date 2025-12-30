import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  User, 
  Mail, 
  Bell, 
  Lock, 
  AlertTriangle,
  Camera,
  Globe,
  Briefcase,
  Calendar,
  ExternalLink
} from 'lucide-angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  readonly User = User;
  readonly Mail = Mail;
  readonly Bell = Bell;
  readonly Lock = Lock;
  readonly AlertTriangle = AlertTriangle;
  readonly Camera = Camera;
  readonly Globe = Globe;
  readonly Briefcase = Briefcase;
  readonly Calendar = Calendar;
  readonly ExternalLink = ExternalLink;

  user = {
    name: 'Ameth Cruz',
    email: 'ameth@example.com',
    phone: '+52 961 123 4567',
    profileImage: 'assets/ameth.png',
    joinedDate: '2023-06-15',
    occupation: 'Ingeniero en Software',
    role: 'Full Stack Developer',
    bio: 'Desarrollador apasionado por crear soluciones innovadoras y escalables',
    socialLinks: {
      github: 'https://github.com/amethdev',
      linkedin: 'https://linkedin.com/in/amethdev',
      portfolio: 'https://www.amethdev.pro',
      twitter: 'https://twitter.com/amethdev',
      facebook: '',
      instagram: '',
      youtube: '',
      tiktok: ''
    }
  };

  notifications = {
    email: true,
    push: false,
    sms: true
  };

  onSave() {
    console.log('Configuración guardada:', { user: this.user, notifications: this.notifications });
    alert('✅ Cambios guardados exitosamente');
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  onDeleteAccount() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Cuenta eliminada');
    }
  }
}