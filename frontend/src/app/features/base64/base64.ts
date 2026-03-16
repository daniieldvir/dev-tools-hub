import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { Textarea } from '../../shared/components/textarea/textarea';
@Component({
  selector: 'app-base64',
  imports: [ButtonComponent, Textarea],
  templateUrl: './base64.html',
  styleUrl: './base64.scss',
})
export class Base64 {
  text = signal('');
  result = signal('');
  error = signal('');

  handleInputChange(value: string) {
    this.text.set(value);
    this.result.set('');
    this.error.set('');
  }

  encode() {
    this.error.set('');
    try {
      this.result.set(btoa(this.text()));
    } catch (e) {
      this.error.set('Error encoding to Base64');
    }
  }

  decode() {
    try {
      this.result.set(atob(this.text()));
    } catch (e) {
      this.error.set('Error decoding from Base64');
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.result());
  }

  ngOnDestroy() {
    this.text.set('');
    this.result.set('');
    this.error.set('');
  }
}
