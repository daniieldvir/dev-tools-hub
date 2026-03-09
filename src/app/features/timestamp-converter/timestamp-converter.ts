import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { FormsModule } from '@angular/forms';
import { Button as ButtonComponent } from '../../shared/components/button/button';

@Component({
  selector: 'app-timestamp-converter',
  imports: [Button, FormsModule, ButtonComponent],
  templateUrl: './timestamp-converter.html',
  styleUrl: './timestamp-converter.scss',
})
export class TimestampConverter {
  timestamp = signal<number | null>(null);
  readableDate = signal<string>('');

  convertTimestamp() {
    if (!this.timestamp()) {
      this.readableDate.set('');
      return;
    }
    const date = new Date(this.timestamp()! * 1000);
    const formatted =
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ` +
      `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    this.readableDate.set(formatted);
  }

  ngOnDestroy() {
    this.timestamp.set(null);
    this.readableDate.set('');
  }
}
