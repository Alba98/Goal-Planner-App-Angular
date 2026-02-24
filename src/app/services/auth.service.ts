// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginData, RegisterData, User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://api.freeprojectapi.com/api/GoalTracker';
  
  // Señal que almacena el usuario logueado (null si no lo está)
  loggedUser = signal<User | null>(null);

  constructor(private http: HttpClient) {
    // Al iniciar, recuperar usuario del localStorage (solo si existe)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.loggedUser.set(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginData) {
    return this.http.post<User>(`${this.baseUrl}/login`, credentials) // Sin withCredentials
      .pipe(
        tap(user => {
          const { password, ...safeUser } = user as any;
          this.loggedUser.set(safeUser);
          localStorage.setItem('user', JSON.stringify(safeUser));
        })
      );
  }

  register(data: RegisterData) {
    return this.http.post<User>(`${this.baseUrl}/register`, data) // Sin withCredentials
      .pipe(
        tap(user => {
          const { password, ...safeUser } = user as any;
          this.loggedUser.set(safeUser);
          localStorage.setItem('user', JSON.stringify(safeUser));
        })
      );
  }

  logout() {
    // Opcional: llamar a un endpoint de logout si existe
    // this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe();
    this.loggedUser.set(null);
    localStorage.removeItem('user');
  }
}