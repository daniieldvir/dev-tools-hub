import { Component, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search',
  imports: [LucideAngularModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  public searchTerm: string = '';
  public searchTermChanged = output<string>();

  // TODO: Add search shortcut

  onSearchTermChanged(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchTerm = searchTerm;
    this.searchTermChanged.emit(this.searchTerm);
  }
}
