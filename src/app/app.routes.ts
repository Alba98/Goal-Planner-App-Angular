import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent, // Todas las rutas usan el mismo layout
    children: [
      { path: 'home', component: HomeComponent }, // Home público
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Protegidas
      { path: 'goals', component: GoalListComponent, canActivate: [authGuard] },
      { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
      { path: 'reminders', component: RemindersComponent, canActivate: [authGuard] },
    ]
  },
  // Ruta comodín para redirigir cualquier URL no encontrada
  { path: '**', redirectTo: 'home' }
];