import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-textarea',
  imports: [LucideAngularModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  public value = input<string>('');
  public isOutputContainer = input<boolean>(false);
  public placeholder = input<string>('');
  public description = input<string>('');
  public errorMessage = input<string>('');
  public handleInputChange = output<string>();

  onInputChange(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.handleInputChange.emit(value);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.value());
  }
}
