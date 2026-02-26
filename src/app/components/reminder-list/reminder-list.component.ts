import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';
import { ReminderResponse } from '../../model/reminder';
import { NewReminderComponent } from '../new-reminder/new-reminder.component';
import { ReminderItemComponent } from '../reminder-item/reminder-item.component';
import { NotificationService } from '../../services/notification.service';
import { ReminderDetailsComponent } from '../reminder-details/reminder-details.component';

type ReminderFilter = 'all' | 'pending' | 'acknowledged' | 'overdue' | 'today' | 'tomorrow' | 'week';

@Component({
  selector: 'app-reminder-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NewReminderComponent,
    ReminderItemComponent,
    ReminderDetailsComponent
  ],
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {
  private reminderService = inject(ReminderService);
  private notificationService = inject(NotificationService);

  // Signals
  private allReminders = signal<ReminderResponse[]>([]);
  filter = signal<ReminderFilter>('all');
  private searchTerm = signal('');

  // Computed signals for filtered reminders
  filteredReminders = computed(() => {
    let reminders = this.allReminders();

    // Aplicar filtro
    switch (this.filter()) {
      case 'pending':
        reminders = reminders.filter(r => !r.isAcknowledged && !r.isOverdue);
        break;
      case 'acknowledged':
        reminders = reminders.filter(r => r.isAcknowledged);
        break;
      case 'overdue':
        reminders = reminders.filter(r => !r.isAcknowledged && r.isOverdue);
        break;
      case 'today':
        reminders = reminders.filter(r => r.isToday && !r.isAcknowledged);
        break;
      case 'tomorrow':
        reminders = reminders.filter(r => r.isTomorrow && !r.isAcknowledged);
        break;
      case 'week':
        // This requires a more complex calculation
        const now = new Date();
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);
        reminders = reminders.filter(r => {
          const rDate = new Date(r.reminderDateTime);
          return rDate >= now && rDate <= nextWeek && !r.isAcknowledged;
        });
        break;
      default:
        break;
    }

    // Aplicar búsqueda
    const search = this.searchTerm().toLowerCase();
    if (search) {
      reminders = reminders.filter(r => 
        r.title.toLowerCase().includes(search) || 
        r.description?.toLowerCase().includes(search)
      );
    }

    // Ordenar: los más próximos primero
    return reminders.sort((a, b) => {
      return new Date(a.reminderDateTime).getTime() - new Date(b.reminderDateTime).getTime();
    });
  });

  // Agrupar por fecha para mejor visualización
  groupedReminders = computed(() => {
    const reminders = this.filteredReminders();
    const groups: { [key: string]: ReminderResponse[] } = {
      overdue: [],
      today: [],
      tomorrow: [],
      thisWeek: [],
      later: []
    };

    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    reminders.forEach(reminder => {
      const reminderDate = new Date(reminder.reminderDateTime);
      
      if (reminder.isOverdue) {
        groups['overdue'].push(reminder);
      } else if (reminder.isToday) {
        groups['today'].push(reminder);
      } else if (reminder.isTomorrow) {
        groups['tomorrow'].push(reminder);
      } else if (reminderDate <= nextWeek) {
        groups['thisWeek'].push(reminder);
      } else {
        groups['later'].push(reminder);
      }
    });

    return groups;
  });

  stats = computed(() => {
    return this.reminderService.getReminderStats(this.allReminders());
  });

  // UI State
  showNewReminderModal = false;
  showDetailsModal = false;
  selectedReminder: ReminderResponse | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadReminders();
  }

  loadReminders() {
    this.loading = true;
    this.error = null;

    this.reminderService.getAllRemindersByUser().subscribe({
      next: (reminders) => {
        console.log('Reminders loaded:', reminders);
        this.allReminders.set(reminders);
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error loading reminders:', error);
      }
    });
  }

  setFilter(filter: ReminderFilter) {
    this.filter.set(filter);
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  openNewReminderModal() {
    this.showNewReminderModal = true;
  }

  closeNewReminderModal() {
    this.showNewReminderModal = false;
  }

  onReminderCreated(reminderData: any) {
    this.loading = true;

    this.reminderService.createReminder(reminderData).subscribe({
      next: (response) => {
        console.log('Reminder created:', response);
        this.loadReminders();
        this.closeNewReminderModal();
        this.notificationService.success('Reminder created successfully', 'Success');
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error creating reminder:', error);
      }
    });
  }

  onReminderUpdated() {
    this.loadReminders();
    this.notificationService.success('Reminder updated successfully', 'Success');
  }

  toggleReminderAcknowledgement(reminder: ReminderResponse) {
    this.reminderService.toggleReminderAcknowledgement(reminder).subscribe({
      next: () => {
        this.loadReminders();
      },
      error: (error) => {
        console.error('Error toggling reminder:', error);
        this.notificationService.error('Error updating reminder', 'Error');
      }
    });
  }

  viewReminderDetails(reminder: ReminderResponse) {
    this.selectedReminder = reminder;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedReminder = null;
  }

  deleteReminder(reminderId: number) {
    this.reminderService.deleteReminder(reminderId).subscribe({
      next: () => {
        this.loadReminders();
        this.notificationService.success('Reminder deleted successfully', 'Success');
      },
      error: (error) => {
        console.error('Error deleting reminder:', error);
        this.notificationService.error('Error deleting reminder', 'Error');
      }
    });
  }

  retry() {
    this.loadReminders();
  }

  getGroupTitle(group: string): string {
    switch(group) {
      case 'overdue': return '⚠️ Overdue';
      case 'today': return '📅 Today';
      case 'tomorrow': return '🌅 Tomorrow';
      case 'thisWeek': return '📆 This Week';
      case 'later': return '📌 Later';
      default: return group;
    }
  }

  getGroupIcon(group: string): string {
    switch(group) {
      case 'overdue': return 'fas fa-exclamation-triangle text-danger';
      case 'today': return 'fas fa-sun text-warning';
      case 'tomorrow': return 'fas fa-cloud-sun text-info';
      case 'thisWeek': return 'fas fa-calendar-week text-primary';
      case 'later': return 'fas fa-calendar-alt text-secondary';
      default: return 'fas fa-bell';
    }
  }

  // Para usar en el template
  protected Math = Math;
}