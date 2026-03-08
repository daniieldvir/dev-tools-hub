import { Component, computed, input, output, signal, model } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-filter-chip',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './filter-chip.html',
  styleUrls: ['./filter-chip.scss'],
})
export class FilterChip {
  public category = input<string>();
  public activeCategory = model<string>('');

  public label = computed(() => {
    const cat = this.category();
    return cat ? (cat === 'all' ? 'All' : cat[0].toUpperCase() + cat.slice(1)) : '';
  });

  public handleChipClick() {
    if (!this.category()) return;
    this.activeCategory.set(this.category()!);
  }

  public isActive() {
    return this.activeCategory() === this.category();
  }
}