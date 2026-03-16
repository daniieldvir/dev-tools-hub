import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Tool } from '../../core/models/tool.model';
import { ToolsServiceTs } from '../../core/services/tools.service.ts.js';
import { FilterChip } from '../../shared/components/filter-chip/filter-chip.js';
import { Search } from '../../shared/components/search/search';
import { ToolCardComponent } from '../../shared/components/tool-card/tool-card';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-home',
  imports: [Search, ToolCardComponent, FilterChip, Spinner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private toolsService = inject(ToolsServiceTs);
  private router = inject(Router);

  public tools = this.toolsService.tools;
  public categories = this.toolsService.categories;
  public loading = this.toolsService.loading;
  public error = this.toolsService.error;

  public activeChip = signal<string>('all');
  public searchTerm = signal<string>('');

  public filteredTools = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.activeChip();
    const favIds = this.toolsService.favoriteIds();

    return this.tools().filter((tool) => {
      const matchesCategory = category === 'all' || tool.category === category;
      const matchesSearch = tool.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    }).map((tool) => ({
      ...tool,
      isFavorite: favIds.includes(tool.id)
    }));
  });


  onSearchTermChanged(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  onFilterChanged(category: string) {
    this.activeChip.set(category);
  }

  handleToolClicked(tool: Tool) {
    if (tool.id === 'ai_code_reviewer') {
      this.router.navigate(['feature/ai_code_reviewer']);
      return;
    }

    this.router.navigate(['feature', tool.id]);
  }

  onToggleFavorite(tool: Tool) {
    this.toolsService.toggleFavorite(tool);
  }
}
