import { Component } from '@angular/core';
import { TaskStore } from '../../../core/services/task.store';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  constructor(public store: TaskStore, private router: Router) {}

  openAdd() {
    this.router.navigate(['/task/new']);
  }

  goToDetails(id: string) {
    this.router.navigate(['/task', id]);
  }
}
