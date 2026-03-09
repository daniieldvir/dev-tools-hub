import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uuid-generator',
  imports: [Button, LucideAngularModule, FormsModule],
  templateUrl: './uuid-generator.html',
  styleUrl: './uuid-generator.scss',
})
export class UuidGenerator {
  uuid = signal('');

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
