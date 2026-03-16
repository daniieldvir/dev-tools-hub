import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Tool } from '../models/tool.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsServiceTs {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dev-tools-hub.onrender.com';
  private readonly FAVORITES_KEY = 'favorite_tools';

  readonly tools = signal<Tool[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly favorites = signal<Tool[]>(
    (() => {
      const stored = localStorage.getItem(this.FAVORITES_KEY);
      if (!stored) return [];
      try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((t: any) => t && typeof t === 'object' && t.id);
      } catch {
        return [];
      }
    })()
  );
  readonly favoriteIds = computed(() => this.favorites().map(t => t.id));

  readonly categories = computed(() => {
    const tools = this.tools();
    return ['all', ...Array.from(new Set(tools.map((t) => t.category)))];
  });

  constructor() {
    this.loadTools();
    effect(() => {
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(this.favorites()));
    });
  }


  toggleFavorite(tool: Tool) {
    if (!tool || !tool.id) return;

    this.favorites.update(currentFavs => {
      const alreadyFavorite = currentFavs.some(t => t.id === tool.id);
      if (alreadyFavorite) {
        return currentFavs.filter(t => t.id !== tool.id);
      } else {
        return [...currentFavs, tool];
      }
    });
  }

  private loadTools() {
    this.http.get<Tool[]>(`${this.baseUrl}/api/tools`).subscribe(t => this.tools.set(t));
  }

}
