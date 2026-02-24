import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';  

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

   // Objeto para el registro
  loginObj = {
    emailId: '',
    password: ''
  };


  // Objeto para el registro
  registerObj = {
    fullName: '',
    emailId: '',
    password: '',
    mobileNo: ''
  };

  // Cierra el modal (emite el evento al padre)
  closeModal() {
    this.close.emit();
  }

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

  // Alternar entre login y registro
  toggleForm() {
    this.showLogin.update(value => !value);
  }

  // Método llamado al enviar login
  onLogin() {
    console.log('Login attempted');
    // Aquí iría la lógica de autenticación
  }

  // Método llamado al enviar registro
  onRegister() {
    console.log('Register attempted', this.registerObj);
    // Aquí iría la lógica de registro
  }
}