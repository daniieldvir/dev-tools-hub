import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-uuid-generator',
  imports: [Button, LucideAngularModule, FormsModule],
  templateUrl: './uuid-generator.html',
  styleUrl: './uuid-generator.scss',
})
export class UuidGenerator {
  public uuid = signal<string>('');

  generate() {
    this.uuid.set(crypto.randomUUID());
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.uuid());
  }

  ngOnDestroy() {
    this.uuid.set('');
  }
}
