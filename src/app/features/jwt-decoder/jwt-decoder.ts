import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { JwtDecoderService } from '../../core/core/services/jwt-decoder-service';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-jwt-decoder',
  imports: [FormsModule, JsonPipe, Button, LucideAngularModule],
  templateUrl: './jwt-decoder.html',
  styleUrl: './jwt-decoder.scss',
})
export class JwtDecoder {
  private jwtDecoderService = inject(JwtDecoderService);
  public token = signal<string>('');
  public payload = this.jwtDecoderService.payload;
  public error = this.jwtDecoderService.error;

  decodeToken() {
    this.jwtDecoderService.decode(this.token());
    console.log(this.error());
  }

  handleTokenChange() {
    this.error.set(null);
    this.payload.set(null);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.payload(), null, 2));
  }

  ngOnDestroy() {
    this.payload.set(null);
    this.error.set(null);
  }
}
