import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskStore } from '../../../core/services/task.store';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './task-details.component.html',
})
export class TaskDetailsComponent implements OnInit {
  task: any;

  constructor(private route: ActivatedRoute, private router: Router, public store: TaskStore) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.task = this.store.tasks().find((t) => t.id === id);
  }

  deleteTask() {
    this.store.delete(this.task.id);
    this.router.navigate(['/']);
  }

  edit() {
    this.router.navigate(['/task', this.task.id, 'edit']);
  }
}
