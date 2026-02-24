import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalItemComponent } from '../goal-item/goal-item.component';
import { NewGoalComponent } from '../new-goal/new-goal.component';
import { GoalDetailsComponent } from '../goal-details/goal-details.component';

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
  goals: any[] = [];
  showNewGoalModal = false;
  showDetailsModal = false;
  selectedGoal: any = null;

  constructor() {}

  ngOnInit() {
    this.loadGoals();
  }

  loadGoals() {
    // Aquí cargarías los goals desde tu servicio
    this.goals = [
      { 
        id: 1, 
        title: 'Learn Angular', 
        progress: 75, 
        startDate: '2024-01-01', 
        endDate: '2024-03-30',
        description: 'Master Angular framework including components, services, routing, and state management',
        milestones: [
          { id: 1, title: 'Components & Templates', completed: true, targetDate: '2024-01-15' },
          { id: 2, title: 'Services & Dependency Injection', completed: true, targetDate: '2024-02-01' },
          { id: 3, title: 'Routing & Navigation', completed: false, targetDate: '2024-02-15' },
          { id: 4, title: 'Forms & Validation', completed: false, targetDate: '2024-03-01' }
        ]
      },
      { 
        id: 2, 
        title: 'Complete Project', 
        progress: 30, 
        startDate: '2024-02-01', 
        endDate: '2024-04-15',
        description: 'Finish the TaskMaster Pro application with all features',
        milestones: [
          { id: 5, title: 'Frontend Development', completed: true, targetDate: '2024-02-28' },
          { id: 6, title: 'Backend API', completed: false, targetDate: '2024-03-15' },
          { id: 7, title: 'Testing', completed: false, targetDate: '2024-03-30' }
        ]
      },
      { 
        id: 3, 
        title: 'Exercise Routine', 
        progress: 90, 
        startDate: '2024-01-15', 
        endDate: '2024-02-28',
        description: 'Establish and maintain a consistent exercise routine',
        milestones: [
          { id: 8, title: 'Week 1-2: Building habit', completed: true, targetDate: '2024-01-28' },
          { id: 9, title: 'Week 3-4: Increasing intensity', completed: true, targetDate: '2024-02-11' },
          { id: 10, title: 'Week 5-6: Maintenance', completed: false, targetDate: '2024-02-28' }
        ]
      }
    ];
  }

  openNewGoalModal() {
    this.showNewGoalModal = true;
  }

  closeNewGoalModal() {
    this.showNewGoalModal = false;
  }

  onGoalCreated(goal: any) {
    console.log('Goal created:', goal);
    this.loadGoals();
    this.closeNewGoalModal();
  }

  viewGoalDetails(goal: any) {
    this.selectedGoal = goal;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedGoal = null;
  }
}