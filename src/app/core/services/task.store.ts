import { Injectable, computed, signal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  // --- State Signals ---
  tasks = signal<Task[]>([]);
  search = signal('');
  page = signal(1);
  pageSize = 5;

  // Sorting (ASC only)
  sortField = signal<'title' | 'createdAt'>('title');
  setSortField(field: 'title' | 'createdAt') {
    this.sortField.set(field);
  }

  constructor() {
    this.loadMockData();
  }

  private loadMockData() {
    const generated = Array.from({ length: 20 }).map(() => ({
      id: faker.string.uuid(),
      title: faker.hacker.phrase(),
      description: faker.lorem.sentences(2),
      status: faker.helpers.arrayElement(['pending', 'in-progress', 'done']),
      createdAt: faker.date.recent({ days: 20 }),
    }));

    this.tasks.set(generated);
  }

  // --- FILTER ---
  filteredTasks = computed(() => {
    const term = this.search().toLowerCase();
    return this.tasks().filter(
      (t) => t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)
    );
  });

  // --- SORT (ASC only) ---
  sortedTasks = computed(() => {
    const field = this.sortField();

    return [...this.filteredTasks()].sort((a, b) => {
      if (field === 'title') {
        return a.title.localeCompare(b.title); // ASC
      }

      // ASC by date
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  });

  // --- PAGINATION ---
  paginatedTasks = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.sortedTasks().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this.sortedTasks().length / this.pageSize));

  // --- ACTIONS ---
  create(task: Task) {
    this.tasks.update((list) => [...list, task]);
  }

  update(task: Task) {
    this.tasks.update((list) => list.map((item) => (item.id === task.id ? task : item)));
  }

  delete(id: string) {
    this.tasks.update((list) => list.filter((t) => t.id !== id));
  }
}
