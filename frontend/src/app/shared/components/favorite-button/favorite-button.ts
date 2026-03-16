import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-favorite-button',
  imports: [LucideAngularModule],
  templateUrl: './favorite-button.html',
  styleUrl: './favorite-button.scss',
})
export class FavoriteButton {
  public iconSize = input<number>(18);
  public isFavorite = input<boolean>(false);
  public toggleFavorite = output<void>();

  public handleClick($event: Event) {
    $event.stopPropagation();
    this.toggleFavorite.emit();
  }
}
