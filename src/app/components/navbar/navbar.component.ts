import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [LoginModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  modalVisible = false;

  // Inyectamos el servicio y exponemos la señal de usuario
  constructor(public authService: AuthService) {}

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  logout() {
    this.authService.logout();
    // Opcional: redirigir al home TODO
    // this.router.navigate(['/home']);
  }
}
