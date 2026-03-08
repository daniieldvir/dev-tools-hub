import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-json-tools',
  imports: [Button],
  templateUrl: './json-tools.html',
  styleUrl: './json-tools.scss',
})
export class JsonTools {
  inputJson = signal<string>('');
  outputText = signal<string>('');

  handleInputChange(value: string) {
    this.inputJson.set(value);
    this.outputText.set('');
  }

  formatJson() {
    try {
      const parsed = JSON.parse(this.inputJson());
      this.outputText.set(JSON.stringify(parsed, null, 2));
    } catch {
      this.outputText.set('Invalid JSON');
    }
  }

  jsonToInterface() {
    try {
      const parsed = JSON.parse(this.inputJson());
      const interfaceString = this.convertToInterface(parsed);
      this.outputText.set(interfaceString);
    } catch {
      this.outputText.set('Invalid JSON');
    }
  }

  private convertToInterface(obj: any, name = 'RootObject'): string {
    const lines: string[] = [];
    const visited = new Map<any, string>(); // למניעת לולאות אין סופיות
    const convert = (o: any, typeName: string): string[] => {
      if (visited.has(o)) return []; // כבר ראינו את האובייקט הזה
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
}
