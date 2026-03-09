import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Chip } from '../../shared/components/chip/chip';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-password-generator',
  imports: [Chip, Button, LucideAngularModule],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.scss',
})
export class PasswordGenerator {
  length = signal<number>(16);
  includeUppercase = signal<boolean>(false);
  includeNumbers = signal<boolean>(false);
  includeSymbols = signal<boolean>(false);

  password = signal<string>('');

  includeOptions = signal<string[]>(['uppercase', 'numbers', 'symbols']);

  handleLengthChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.length.set(Number(target.value));
  }

  toggleIncludeOption(option: string) {
    if (option === 'uppercase') {
      this.includeUppercase.set(!this.includeUppercase());
    } else if (option === 'numbers') {
      this.includeNumbers.set(!this.includeNumbers());
    } else if (option === 'symbols') {
      this.includeSymbols.set(!this.includeSymbols());
    }
  }

  generate() {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = lower;
    if (this.includeUppercase()) chars += upper;
    if (this.includeNumbers()) chars += numbers;
    if (this.includeSymbols()) chars += symbols;

    let pwd = '';
    for (let i = 0; i < this.length(); i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }

    this.password.set(pwd);
  }

  isOptionActive(option: string) {
    return option === 'uppercase'
      ? this.includeUppercase()
      : option === 'numbers'
        ? this.includeNumbers()
        : option === 'symbols'
          ? this.includeSymbols()
          : false;
  }

  copyPassword() {
    if (!this.password()) return;
    navigator.clipboard.writeText(this.password());
  }

  ngOnDestroy() {
    this.length.set(16);
    this.includeUppercase.set(true);
    this.includeNumbers.set(true);
    this.includeSymbols.set(true);
    this.password.set('');
  }
}
