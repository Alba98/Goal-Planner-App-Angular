// goal-details.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalResponse } from '../../model/goal';

@Component({
  selector: 'app-goal-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent {
  @Input() goal!: GoalResponse;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  getProgressColor(progress: number = 0): string {
    if (progress >= 75) return 'success';
    if (progress >= 50) return 'primary';
    if (progress >= 25) return 'warning';
    return 'danger';
  }

  getDaysRemaining(): number {
    if (!this.goal?.endDate) return 0;
    
    const today = new Date();
    const endDate = new Date(this.goal.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getCompletedMilestones(): number {
    if (!this.goal?.milestones) return 0;
    return this.goal.milestones.filter(m => m.isCompleted).length;
  }

  getTotalMilestones(): number {
    return this.goal?.milestones?.length || 0;
  }
}