import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { TOKEN_CATEGORIES } from '../../../core/constants/token.const';
import { Button } from '../../../shared/components/button/button';
import { Chip } from '../../../shared/components/chip/chip';
import {
  addPartFromInputSequenceSingle,
  buildValidRegex,
  copyToClipboard,
} from '../../../shared/utils/regex.util';
import { Input } from '../../../shared/input/input';

type RegexPart = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-regex-generator',
  imports: [FormsModule, Button, Chip, LucideAngularModule, Input],
  templateUrl: './regex-generator.html',
  styleUrl: './regex-generator.scss',
})
export class RegexGenerator {
  TOKEN_CATEGORIES = TOKEN_CATEGORIES;

  parts = signal<RegexPart[]>([]);
  generatorInput = signal('');

  builtRegex = computed(() => {
    const pattern = this.parts()
      .map((p) => p.value)
      .join('');

    return buildValidRegex(pattern);
  });

  addPart(text: string) {
    const part = addPartFromInputSequenceSingle(text);

    if (part) {
      this.parts.update((prev) => {
        const exists = prev.some((p) => p.label === part.label && p.value === part.value);

        return exists ? prev : [...prev, part];
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
    copyToClipboard(this.builtRegex() ?? '');
  }

  ngOnDestroy() {
    this.parts.set([]);
    this.generatorInput.set('');
  }
}
