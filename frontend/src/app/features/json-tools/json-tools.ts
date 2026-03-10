import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Textarea } from '../../shared/components/textarea/textarea';

@Component({
  selector: 'app-json-tools',
  imports: [Button, Textarea],
  templateUrl: './json-tools.html',
  styleUrl: './json-tools.scss',
})
export class JsonTools {
  inputJson = signal<string>('');
  outputText = signal<string>('');
  errorMessage = signal<string>('');

  onInputChange(value: string) {
    this.inputJson.set(value);
    this.outputText.set('');
    this.errorMessage.set('');
  }

  formatJson() {
    try {
      const parsed = JSON.parse(this.inputJson());
      this.outputText.set(JSON.stringify(parsed, null, 2));
    } catch {
      this.errorMessage.set('Invalid JSON');
    }
  }

  jsonToInterface() {
    try {
      const parsed = JSON.parse(this.inputJson());
      const interfaceString = this.convertToInterface(parsed);
      this.outputText.set(interfaceString);
    } catch {
      this.errorMessage.set('Invalid JSON');
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.outputText());
  }

  private convertToInterface(obj: any, name = 'RootObject'): string {
    const lines: string[] = [];
    const visited = new Map<any, string>();
    const convert = (o: any, typeName: string): string[] => {
      if (visited.has(o)) return [];
      visited.set(o, typeName);

      const result: string[] = [];
      result.push(`interface ${typeName} {`);
      for (const key in o) {
        const value = o[key];
        let typeStr: string;

        if (value === null) {
          typeStr = 'any';
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            typeStr = 'any[]';
          } else {
            const first = value[0];
            if (typeof first === 'object' && first !== null) {
              const childName = `${this.capitalize(key)}Item`;
              result.push(...convert(first, childName));
              typeStr = `${childName}[]`;
            } else {
              typeStr = `${typeof first}[]`;
            }
          }
        } else if (typeof value === 'object') {
          const childName = this.capitalize(key);
          result.push(...convert(value, childName));
          typeStr = childName;
        } else {
          typeStr = typeof value;
        }

        result.push(`  ${key}: ${typeStr};`);
      }
      result.push('}');
      return result;
    };

    lines.push(...convert(obj, name));
    return lines.join('\n');
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnDestroy() {
    this.inputJson.set('');
    this.outputText.set('');
    this.errorMessage.set('');
  }
}
