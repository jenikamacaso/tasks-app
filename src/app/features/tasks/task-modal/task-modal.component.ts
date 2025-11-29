import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskStore } from '../../../core/services/task.store';
import { faker } from '@faker-js/faker';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './task-modal.component.html',
})
export class TaskModalComponent {
  @ViewChild('taskForm') taskForm!: NgForm;

  task: any = {
    id: faker.string.uuid(),
    title: '',
    description: '',
    status: 'pending',
    createdAt: new Date(),
  };

  editMode = false;

  constructor(private route: ActivatedRoute, private router: Router, public store: TaskStore) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.task = structuredClone(store.tasks().find((t) => t.id === id));
    }
  }

  save() {
    if (this.taskForm.invalid) {
      this.taskForm.form.markAllAsTouched();
      return;
    }

    if (this.editMode) {
      this.store.update(this.task);
    } else {
      this.store.create(this.task);
    }
    this.router.navigate(['/']);
  }

  cancel() {
    if (this.editMode && this.task.id) {
      this.router.navigate(['/task', this.task.id]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
