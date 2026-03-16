import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[attr.disabled]': 'disabled() ? true : null',
    '[class.disabled]': 'disabled()',
    '[class.active]': 'active()',
  },
})
export class ButtonComponent {
  public label = input<string>();
  public click = output<void>();
  public variant = input<'primary' | 'secondary'>('primary');
  public disabled = input<boolean>(false);
  public icon = input<{ name: string; size: number }>();
  public active = input<boolean>(false);
  

  public handleClick() {
    this.click.emit();
  }
}
