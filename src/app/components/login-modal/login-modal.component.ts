import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { AuthService } from '../../services/auth.service';
import { LoginData, RegisterData } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  imports: [FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();

  // Signal para alternar entre login (true) y registro (false)
  showLogin = signal<boolean>(true);

  // Usamos la interfaz LoginData
  loginObj: LoginData = {
    emailId: '',
    password: ''
  };

  // Usamos la interfaz RegisterData
  registerObj: RegisterData = {
    fullName: '',
    emailId: '',
    password: '',
    mobileNo: ''
  };
  
  constructor(private authService: AuthService, private router: Router) {}

  // Cierra el modal (emite el evento al padre)
  closeModal() {
    this.close.emit();
  }

  /*
  // Maneja clics en el fondo del modal
  onBackdropClick(event: MouseEvent) {
    // Si el clic fue directamente en el elemento con clase 'modal' (el fondo)
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  // Cierra con la tecla Escape (solo si el modal está visible)
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.visible) {
      this.closeModal();
    }
  }
  */

  // Alternar entre login y registro
  toggleForm() {
    this.showLogin.update(value => !value);
  }

  // Método llamado al enviar login
  onLogin() {
    this.authService.login(this.loginObj).subscribe({
      next: () => {
        this.closeModal(); // Cierra el modal al loguearse
        //this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Muestra mensaje de error
        console.error('Login error', err);
      }
    });
  }

  // Método llamado al enviar registro
  onRegister() {
    this.authService.register(this.registerObj).subscribe({
      next: () => {
        // Al registrarse, también puede cerrar modal o cambiar a login
        this.closeModal(); // this.closeModal(); o this.showLogin.set(true);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Muestra mensaje de error
        console.error('Register error', err);
      }
    });
  }

}