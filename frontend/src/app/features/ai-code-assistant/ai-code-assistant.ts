import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AiCodeAssistantService,
  AiMode,
  RunOptions,
} from '../../core/services/ai-code-assistant.service';
import { ButtonComponent } from '../../shared/components/button/button';
import { Chip } from '../../shared/components/chip/chip';
import { Textarea } from '../../shared/components/textarea/textarea';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-ai-code-assistant',
  standalone: true,
  imports: [CommonModule, ButtonComponent, Textarea, Chip, Spinner],
  templateUrl: './ai-code-assistant.html',
  styleUrl: './ai-code-assistant.scss',
})
export class AiCodeAssistant {
  private aiService = inject(AiCodeAssistantService);

  code = signal<string>('');
  mode = signal<AiMode>('explain');
  language = signal<string>('TypeScript');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  result = signal<string>('');

  modes: { id: AiMode; label: string }[] = [
    { id: 'explain', label: 'Explain this snippet' },
    { id: 'refactor', label: 'Refactor / Clean Code' },
    { id: 'naming', label: 'Suggest better names' },
  ];

  onModeChange(mode: AiMode) {
    this.resetResults();
    this.mode.set(mode);
  }

  onCodeChange(value: string) {
    this.code.set(value);
    this.result.set('');
  }

  onLanguageChange(value: string) {
    this.resetResults();
    this.language.set(value);
  }

  run() {
    this.loading.set(true);
    this.error.set(null);
    this.result.set('');

    const options: RunOptions = {
      mode: this.mode(),
      code: this.code(),
      language: this.language(),
    };

    this.aiService.run(options).subscribe(({ result, error }) => {
      if (error) {
        this.error.set(error);
        this.loading.set(false);
        return;
      }

      this.result.set(result);
      this.loading.set(false);
    });
  }

  copyResult() {
    const text = this.result();
    if (!text) return;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  ngOnDestroy() {
    this.resetResults();
  }

  private resetResults() {
    this.code.set('');
    this.mode.set('explain');
    this.language.set('TypeScript');
    this.result.set('');
    this.error.set(null);
    this.loading.set(false);
  }
}
