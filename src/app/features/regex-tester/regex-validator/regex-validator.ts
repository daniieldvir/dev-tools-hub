import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-regex-validator',
  imports: [FormsModule, Button],
  templateUrl: './regex-validator.html',
  styleUrl: './regex-validator.scss',
})
export class RegexValidator {
  regexInput = signal('');
  testString = signal('');
  regexFlags = signal('g');
  validationResult = signal<boolean | null>(null);
  matchResults = signal<string[]>([]);
  matchCount = signal(0);
  validationError = signal('');

  validateAndTest() {
    const pattern = this.regexInput();
    if (!pattern) {
      this.validationResult.set(null);
      this.matchResults.set([]);
      this.matchCount.set(0);
      this.validationError.set('');
      return;
    }

    try {
      const regex = new RegExp(pattern, this.regexFlags());
      this.validationResult.set(true);
      this.validationError.set('');

      if (this.testString()) {
        const matches = this.testString().match(regex);
        this.matchResults.set(matches ?? []);
        this.matchCount.set(matches?.length ?? 0);
      } else {
        this.matchResults.set([]);
        this.matchCount.set(0);
      }
    } catch (e: any) {
      this.validationResult.set(false);
      this.validationError.set(e.message ?? 'Invalid regex');
      this.matchResults.set([]);
      this.matchCount.set(0);
    }
  }

  highlightedTestString = computed(() => {
    const pattern = this.regexInput();
    const test = this.testString();
    if (!pattern || !test || this.validationResult() !== true) return test;

    try {
      const regex = new RegExp(pattern, this.regexFlags());
      return test.replace(regex, (match) => `<mark>${match}</mark>`);
    } catch {
      return test;
    }
  });

  toggleFlag(flag: string) {
    const current = this.regexFlags();
    if (current.includes(flag)) {
      this.regexFlags.set(current.replace(flag, ''));
    } else {
      this.regexFlags.set(current + flag);
    }
  }

  hasFlag(flag: string): boolean {
    return this.regexFlags().includes(flag);
  }
}
