import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { addPartFromInputSequenceSingle } from '../../../shared/utils/regex.util';

type RegexPart = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-regex-generator',
  imports: [FormsModule, Button],
  templateUrl: './regex-generator.html',
  styleUrl: './regex-generator.scss',
})
export class RegexGenerator {
  parts = signal<RegexPart[]>([]);
  generatorInput = signal('');

  builtRegex = computed(() => {
    const pattern = this.parts()
      .map((p) => p.value)
      .join('');
    if (!pattern) return '';
    try {
      new RegExp(pattern);
      return pattern;
    } catch {
      return null;
    }
  });

  addPart(text: string) {
    const part = addPartFromInputSequenceSingle(text);

    if (part) {
      this.parts.update((prev) => {
        const exists = prev.some((p) => p.label === part.label && p.value === part.value);
        if (!exists) {
          return [...prev, part];
        }
        return prev;
      });
    }
  }

  removePart(index: number) {
    this.parts.update((prev) => prev.filter((_, i) => i !== index));
  }

  clearParts() {
    this.parts.set([]);
  }

  copyBuiltRegex() {
    const regex = this.builtRegex();
    if (regex) {
      navigator.clipboard.writeText(regex);
    }
  }
}
