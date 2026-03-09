import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import {
  createSafeRegex,
  getRegexMatches,
  hasRegexFlag,
  highlightMatches,
  toggleRegexFlag,
} from '../../../shared/utils/regex.util';

@Component({
  selector: 'app-regex-validator',
  imports: [FormsModule, Button, JsonPipe],
  templateUrl: './regex-validator.html',
  styleUrl: './regex-validator.scss',
})
export class RegexValidator {
  regexInput = signal<string | null>(null);
  testString = signal<string | null>(null);
  regexFlags = signal<string>('g');
  validationResult = signal<boolean | null>(null);
  matchResults = signal<string[]>([]);
  matchCount = signal(0);
  validationError = signal<string | null>(null);

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
      const regex = createSafeRegex(pattern, this.regexFlags());

      this.validationResult.set(true);
      this.validationError.set('');

      if (this.testString()) {
        const matches = getRegexMatches(regex, this.testString() ?? '');
        this.matchResults.set(matches);
        this.matchCount.set(matches.length);
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
      const regex = createSafeRegex(pattern, this.regexFlags());
      return highlightMatches(test, regex);
    } catch {
      return test;
    }
  });

  toggleFlag(flag: string) {
    this.regexFlags.set(toggleRegexFlag(this.regexFlags(), flag));
  }

  hasFlag(flag: string): boolean {
    return hasRegexFlag(this.regexFlags(), flag);
  }

  ngOnDestroy() {
    this.regexInput.set(null);
    this.testString.set(null);
    this.regexFlags.set('g');
    this.validationResult.set(null);
    this.matchResults.set([]);
    this.matchCount.set(0);
    this.validationError.set(null);
  }
}
