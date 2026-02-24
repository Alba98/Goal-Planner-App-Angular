import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-goal-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.css']
})
export class GoalItemComponent {
  @Input() goal: any;
  @Output() viewDetails = new EventEmitter<any>();

  onViewDetails() {
    debugger
    this.viewDetails.emit(this.goal);
  }
}