import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-goal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() goalCreated = new EventEmitter<any>();

  goalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.goalForm = this.fb.group({
      goalName: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
      milestones: this.fb.array([])
    });
  }

  get milestones() {
    return this.goalForm.get('milestones') as FormArray;
  }

  addMilestone() {
    const milestoneForm = this.fb.group({
      milestoneName: ['', Validators.required],
      targetDate: ['', Validators.required],
      description: ['']
    });
    this.milestones.push(milestoneForm);
  }

  removeMilestone(index: number) {
    this.milestones.removeAt(index);
  }

  onSubmit() {
    if (this.goalForm.valid) {
      this.goalCreated.emit(this.goalForm.value);
    } else {
      Object.keys(this.goalForm.controls).forEach(key => {
        const control = this.goalForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}