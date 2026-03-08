import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public label = input<string>();
  public click = output<void>();

  public handleClick() {
    this.click.emit();
  }
}
