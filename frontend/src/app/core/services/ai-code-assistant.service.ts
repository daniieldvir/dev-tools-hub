import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export type AiMode = 'explain' | 'refactor' | 'naming';

export interface RunOptions {
  mode: AiMode;
  code: string;
  language?: string;
}

export interface RunResult {
  result: string;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AiCodeAssistantService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  run(options: RunOptions) {
    const trimmedCode = options.code.trim();

    if (!trimmedCode) {
      return of<RunResult>({
        result: '',
        error: 'Please paste a code snippet.',
      });
    }

    return this.http
      .post<{ result: string }>(`${this.baseUrl}/api/ai/code-assistant`, {
        mode: options.mode,
        code: trimmedCode,
        language: options.language,
      })
      .pipe(
        map((response) => ({
          result: response.result ?? '',
          error: null,
        })),
        catchError(() =>
          of<RunResult>({
            result: '',
            error: 'Something went wrong. Please try again later.',
          }),
        ),
      );
  }
}
