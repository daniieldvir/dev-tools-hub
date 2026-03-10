import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { explainRegex, validateRegex } from '../../../shared/utils/regex.util';

interface RegexExplanation {
  token: string;
  description: string;
}

@Component({
  selector: 'app-regex-to-text',
  imports: [FormsModule, Button],
  templateUrl: './regex-to-text.html',
  styleUrl: './regex-to-text.scss',
})
export class RegexToText {
  regexToParseInput = signal('');
  parsedExplanation = signal<RegexExplanation[]>([]);
  parseError = signal('');

  parseRegexToText() {
    const pattern = this.regexToParseInput();

    if (!pattern) {
      this.parsedExplanation.set([]);
      this.parseError.set('');
      return;
    }

    const error = validateRegex(pattern);

    if (error) {
      this.parseError.set(error);
      this.parsedExplanation.set([]);
      return;
    }

    this.parseError.set('');
    this.parsedExplanation.set(explainRegex(pattern));
  }

  ngOnDestroy() {
    this.regexToParseInput.set('');
    this.parsedExplanation.set([]);
    this.parseError.set('');
  }
}
