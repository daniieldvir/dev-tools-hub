import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  public type = input<string>('text');
  public value = input<string | number | null>('');
  public placeholder = input<string>('');
  public isOutputContainer = input<boolean>(false);
  public description = input<string>('');
  public handleInputChange = output<string>();

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.handleInputChange.emit(value);
  }
}
