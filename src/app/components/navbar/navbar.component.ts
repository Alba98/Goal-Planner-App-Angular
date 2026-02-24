import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginModalComponent } from "../login-modal/login-modal.component";

@Component({
  selector: 'app-navbar',
  imports: [LoginModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  modalVisible = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
}
