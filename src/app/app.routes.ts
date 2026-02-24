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
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: LayoutComponent, // Este componente tiene <router-outlet>
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'goals', component: GoalListComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'reminders', component: RemindersComponent },
    ]
  }
];