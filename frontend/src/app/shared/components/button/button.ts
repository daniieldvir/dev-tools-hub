import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[attr.disabled]': 'disabled() ? true : null',
    '[class.disabled]': 'disabled()',
  },
})
export class Button {
  public label = input<string>();
  public click = output<void>();
  public disabled = input<boolean>(false);

  public handleClick() {
    this.click.emit();
  }
}
