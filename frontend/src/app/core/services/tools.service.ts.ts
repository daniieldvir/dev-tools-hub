import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Tool } from '../models/tool.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsServiceTs {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dev-tools-hub.onrender.com';

  readonly tools = signal<Tool[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly categories = computed(() => {
    const tools = this.tools();
    return ['all', ...Array.from(new Set(tools.map((t) => t.category)))];
  });

  constructor() {
    this.loadTools();
  }

  private loadTools(): void {
    this.http.get<Tool[]>(`${this.baseUrl}/api/tools`).subscribe({
      next: (tools) => this.tools.set(tools),
      error: (error) => {
        console.error('Failed to load tools from backend', error);
        this.error.set((error as Error).message ?? 'Failed to load tools');
      },
    });
  }
}
