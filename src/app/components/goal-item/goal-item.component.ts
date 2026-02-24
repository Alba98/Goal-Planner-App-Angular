// goal-item.component.ts
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoalResponse } from '../../model/goal';

@Component({
  selector: 'app-goal-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.css']
})
export class GoalItemComponent {
  @Input() goal!: GoalResponse;
  @Output() viewDetails = new EventEmitter<GoalResponse>();

  onViewDetails() {
    this.viewDetails.emit(this.goal);
  }

  getProgressColor(progress: number = 0): string {
    if (progress >= 75) return 'success';
    if (progress >= 50) return 'primary';
    if (progress >= 25) return 'warning';
    return 'danger';
  }
}