import { Component, computed, input, model, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './chip.html',
  styleUrls: ['./chip.scss'],
})
export class Chip {
  public label = input<string>('');
  public isActive = input<boolean>(false);

  public chipClick = output<void>();

  public handleChipClick() {
    this.chipClick.emit();
  }
}
