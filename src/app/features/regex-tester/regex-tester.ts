import { Component, signal } from '@angular/core';
import { RegexValidator } from './regex-validator/regex-validator';
import { RegexGenerator } from './regex-generator/regex-generator';
import { RegexToText } from './regex-to-text/regex-to-text';

type ActiveTab = 'validator' | 'generator' | 'toText';

@Component({
  selector: 'app-regex-tester',
  imports: [RegexValidator, RegexGenerator, RegexToText],
  templateUrl: './regex-tester.html',
  styleUrl: './regex-tester.scss',
})
export class RegexTester {
  activeTab = signal<ActiveTab>('validator');
}
