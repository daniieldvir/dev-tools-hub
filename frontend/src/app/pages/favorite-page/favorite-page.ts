import { Component, inject } from '@angular/core';
import { ToolsServiceTs } from '../../core/services/tools.service.ts.js';
import { ToolCardComponent } from '../../shared/components/tool-card/tool-card';
import { Tool } from '../../core/models/tool.model';
@Component({
  selector: 'app-favorite-page',
  imports: [ToolCardComponent],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.scss',
})
export class FavoritePage {
  private toolsService = inject(ToolsServiceTs);

  public favoriteTools = this.toolsService.favorites;

  onToggleFavorite(tool: Tool) {
    this.toolsService.toggleFavorite(tool);
  }
}
