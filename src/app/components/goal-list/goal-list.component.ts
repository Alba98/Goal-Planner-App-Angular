import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalItemComponent } from '../goal-item/goal-item.component';
import { NewGoalComponent } from '../new-goal/new-goal.component';
import { GoalDetailsComponent } from '../goal-details/goal-details.component';
import { GoalService } from '../../services/goal.service';
import { GoalResponse } from '../../model/goal';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    GoalItemComponent,
    NewGoalComponent,
    GoalDetailsComponent
  ],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  private goalService = inject(GoalService);
  
  goals: GoalResponse[] = [];
  showNewGoalModal = false;
  showDetailsModal = false;
  selectedGoal: GoalResponse | null = null; 
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadGoals();
    // this.testCreateGoal(); // TODO: COMENTAR O ELIMINAR LA LLAMADA DE PRUEBA
  }

  loadGoals() {
    this.loading = true;
    this.error = null;
    
    this.goalService.getAllGoalsByUser().subscribe({
      next: (goals) => {
        console.log('Goals loaded:', goals);
        this.goals = goals;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error loading goals:', error);
      }
    });
  }

  openNewGoalModal() {
    this.showNewGoalModal = true;
  }

  closeNewGoalModal() {
    this.showNewGoalModal = false;
  }

  onGoalCreated(goalData: any) {
    this.loading = true;
    
    this.goalService.createGoalWithMilestones(goalData).subscribe({
      next: (response) => {
        console.log('Goal created successfully:', response);
        this.loadGoals();
        this.closeNewGoalModal();
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error creating goal:', error);
      }
    });
  }

  onGoalUpdated() {
    // Recargar la lista de goals cuando se actualiza un goal
    this.loadGoals();
    
    // Opcional: mostrar mensaje de éxito
    console.log('Goal updated successfully');
  }

  viewGoalDetails(goal: GoalResponse) { // 👈 USAR GoalResponse
    if (!goal.goalId) return;
    
    this.loading = true;
    
    this.goalService.getGoalById(goal.goalId).subscribe({
      next: (goalDetails) => {
        console.log('Goal details loaded:', goalDetails);
        this.selectedGoal = goalDetails;
        this.showDetailsModal = true;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error loading goal details:', error);
      }
    });
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedGoal = null;
  }

  retry() {
    this.loadGoals();
  }

  // Método de prueba - puedes llamarlo manualmente desde la consola del navegador si es necesario
  testCreateGoal() {
    const testGoal = {
      goalName: "Aprender Angular",
      description: "Completar el curso de Angular avanzado",
      startDate: "2026-03-01",
      endDate: "2026-06-30",
      milestones: [
        {
          milestoneName: "Componentes y Templates",
          targetDate: "2026-03-15",
          description: "Dominar la creación de componentes"
        },
        {
          milestoneName: "Servicios y DI",
          targetDate: "2026-04-01",
          description: "Entender la inyección de dependencias"
        },
        {
          milestoneName: "Routing",
          targetDate: "2026-04-30",
          description: "Implementar navegación avanzada"
        }
      ]
    };

    console.log('🧪 Test goal:', testGoal);
    this.onGoalCreated(testGoal);
  }
}