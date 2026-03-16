import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Tool } from '../../../core/models/tool.model';
import { FavoriteButton } from '../favorite-button/favorite-button';

@Component({
  selector: 'app-tool-card',
  imports: [LucideAngularModule, FavoriteButton],
  templateUrl: './tool-card.html',
  styleUrl: './tool-card.scss',
})
export class ToolCardComponent {
  public tool = input<Tool>();
  public isFavorite = input<boolean>(false);
  public toolClicked = output<Tool>();
  public toggleFavorite = output<Tool>();

  public handleClick() {
    this.toolClicked.emit(this.tool()!);
  }

  public onToggleFavorite(tool: Tool) {
    this.toggleFavorite.emit(tool);
  }
}
