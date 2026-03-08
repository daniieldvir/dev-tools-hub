import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';

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

    try {
      new RegExp(pattern);
      this.parseError.set('');
    } catch (e: any) {
      this.parseError.set(e.message ?? 'Invalid regex');
      this.parsedExplanation.set([]);
      return;
    }

    const explanations = this.explainRegex(pattern);
    this.parsedExplanation.set(explanations);
  }

  private explainRegex(pattern: string): RegexExplanation[] {
    const explanations: RegexExplanation[] = [];
    let i = 0;

    while (i < pattern.length) {
      const char = pattern[i];

      if (char === '^') {
        explanations.push({ token: '^', description: 'Start of string' });
        i++;
      } else if (char === '$') {
        explanations.push({ token: '$', description: 'End of string' });
        i++;
      } else if (char === '.') {
        explanations.push({ token: '.', description: 'Any character (except newline)' });
        i++;
      } else if (char === '\\' && i + 1 < pattern.length) {
        const next = pattern[i + 1];
        const escaped = `\\${next}`;
        const escapeMap: Record<string, string> = {
          '\\d': 'Digit (0-9)',
          '\\D': 'Non-digit',
          '\\w': 'Word character (a-z, A-Z, 0-9, _)',
          '\\W': 'Non-word character',
          '\\s': 'Whitespace (space, tab, newline)',
          '\\S': 'Non-whitespace',
          '\\b': 'Word boundary',
          '\\B': 'Non-word boundary',
          '\\n': 'Newline',
          '\\t': 'Tab',
          '\\r': 'Carriage return',
        };
        explanations.push({
          token: escaped,
          description: escapeMap[escaped] ?? `Literal "${next}"`,
        });
        i += 2;
      } else if (char === '[') {
        const end = pattern.indexOf(']', i);
        if (end !== -1) {
          const group = pattern.substring(i, end + 1);
          const isNegated = group[1] === '^';
          explanations.push({
            token: group,
            description: isNegated
              ? `Any character NOT in: ${group.slice(2, -1)}`
              : `Any character in: ${group.slice(1, -1)}`,
          });
          i = end + 1;
        } else {
          explanations.push({ token: char, description: 'Literal "["' });
          i++;
        }
      } else if (char === '(') {
        let depth = 1;
        let j = i + 1;
        while (j < pattern.length && depth > 0) {
          if (pattern[j] === '(' && pattern[j - 1] !== '\\') depth++;
          if (pattern[j] === ')' && pattern[j - 1] !== '\\') depth--;
          j++;
        }
        const group = pattern.substring(i, j);
        let desc = 'Capturing group';
        if (group.startsWith('(?:')) desc = 'Non-capturing group';
        else if (group.startsWith('(?=')) desc = 'Positive lookahead';
        else if (group.startsWith('(?!')) desc = 'Negative lookahead';
        else if (group.startsWith('(?<=')) desc = 'Positive lookbehind';
        else if (group.startsWith('(?<!')) desc = 'Negative lookbehind';
        explanations.push({ token: group, description: `${desc}: ${group}` });
        i = j;
      } else if (char === '{') {
        const end = pattern.indexOf('}', i);
        if (end !== -1) {
          const quantifier = pattern.substring(i, end + 1);
          const inner = quantifier.slice(1, -1);
          let desc: string;
          if (inner.includes(',')) {
            const [min, max] = inner.split(',');
            desc = max?.trim() ? `Between ${min} and ${max.trim()} times` : `At least ${min} times`;
          } else {
            desc = `Exactly ${inner} times`;
          }
          explanations.push({ token: quantifier, description: desc });
          i = end + 1;
        } else {
          explanations.push({ token: char, description: 'Literal "{"' });
          i++;
        }
      } else if (char === '*') {
        explanations.push({ token: '*', description: 'Zero or more times' });
        i++;
      } else if (char === '+') {
        explanations.push({ token: '+', description: 'One or more times' });
        i++;
      } else if (char === '?') {
        explanations.push({ token: '?', description: 'Optional (zero or one time)' });
        i++;
      } else if (char === '|') {
        explanations.push({ token: '|', description: 'OR (alternative)' });
        i++;
      } else {
        explanations.push({ token: char, description: `Literal "${char}"` });
        i++;
      }
    }

    return explanations;
  }
}
