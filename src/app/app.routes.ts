import { Routes } from '@angular/router';
import { TaskListComponent } from './features/tasks/task-list/task-list.component';
import { TaskDetailsComponent } from './features/tasks/task-details/task-details.component';
import { TaskModalComponent } from './features/tasks/task-modal/task-modal.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'task/new', component: TaskModalComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
  { path: 'task/:id/edit', component: TaskModalComponent }
];