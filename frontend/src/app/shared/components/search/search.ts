import { Component, ElementRef, output, signal, viewChild } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search',
  imports: [LucideAngularModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  public searchTermChanged = output<string>();
  public hasValue = signal(false);

  private searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  onSearchTermChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.hasValue.set(value.length > 0);
    this.searchTermChanged.emit(value);
  }

  onClearSearch() {
    const input = this.searchInput()?.nativeElement;
    if (input) {
      input.value = '';
    }
    this.hasValue.set(false);
    this.searchTermChanged.emit('');
  }
}
