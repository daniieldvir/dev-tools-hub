import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-json-formatter',
  imports: [Button],
  templateUrl: './json-formatter.html',
  styleUrl: './json-formatter.scss',
})
export class JsonFormatter {
  public inputJson = signal<string>('');
  public formattedJson = signal<string>('');

  handleInputChange(value: string) {
    this.inputJson.set(value);
    this.formattedJson.set('');
  }

  handleFormatClick() {
    try {
      const parsed = JSON.parse(this.inputJson());
      this.formattedJson.set(JSON.stringify(parsed, null, 2));
    } catch {
      this.formattedJson.set('Invalid JSON');
    }
  }
}
