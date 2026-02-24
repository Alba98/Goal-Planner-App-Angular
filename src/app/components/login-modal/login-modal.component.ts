import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();

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
}