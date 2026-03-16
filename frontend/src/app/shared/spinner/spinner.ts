import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-spinner',
  imports: [LucideAngularModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  public size = input<number>(32);
}
