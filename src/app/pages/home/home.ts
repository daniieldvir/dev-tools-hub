import { Component, computed, inject, signal } from '@angular/core';
import { ToolsServiceTs } from '../../core/core/services/tools.service.ts';
import { Tool } from '../../core/models/tool.model';
import { Search } from '../../shared/components/search/search';
import { ToolCardComponent } from '../../shared/components/tool-card/tool-card';
import { FilterChip } from '../../shared/components/filter-chip/filter-chip.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Search, ToolCardComponent, FilterChip],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private toolsService = inject(ToolsServiceTs);
  private router = inject(Router);

  public tools: Tool[] = this.toolsService.tools;
  public categories: string[] = this.toolsService.categories;


  public activeChip = signal<string>('all');
  public searchTerm = signal<string>('');

  public filteredTools = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.activeChip();

    return this.tools.filter(tool => {
      const matchesCategory = category === 'all' || tool.category === category;
      const matchesSearch = tool.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });


  ngOnInit() {
    console.log('tools', this.tools);
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm.set(searchTerm)
    console.log('searchTerm', searchTerm);
  }

  onFilterChanged(category: string) {
    this.activeChip.set(category)
    console.log('category', category);
  }

  handleToolClicked(tool: Tool) {
    this.router.navigate([`feature/${tool.id}`]);
  }
}
