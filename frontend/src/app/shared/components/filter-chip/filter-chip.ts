import { Component, computed, input, model } from '@angular/core';
import { Chip } from '../chip/chip';

@Component({
  selector: 'app-filter-chip',
  imports: [Chip],
  templateUrl: './filter-chip.html',
  styleUrl: './filter-chip.scss',
})
export class FilterChip {
  public category = input<string>();
  public activeCategory = model<string>('');

  public label = computed(() => {
    const cat = this.category();
    return cat ? (cat === 'all' ? 'All' : cat[0].toUpperCase() + cat.slice(1)) : '';
  });

  public isActive = computed(() => {
    return this.activeCategory() === this.category();
  });

  public handleChipClick() {
    const cat = this.category();
    if (!cat) return;

    this.activeCategory.set(cat);
  }
}
