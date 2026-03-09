import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Button } from '../../shared/components/button/button';
@Component({
  selector: 'app-base64',
  imports: [FormsModule, Button, LucideAngularModule],
  templateUrl: './base64.html',
  styleUrl: './base64.scss',
})
export class Base64 {
  text = signal('');
  result = signal('');
  error = signal('');

  handleInputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.text.set(target.value);
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
