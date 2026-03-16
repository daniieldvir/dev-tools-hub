import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { JwtDecoderService } from '../../core/services/jwt-decoder-service';
import { ButtonComponent } from '../../shared/components/button/button';
import { Textarea } from '../../shared/components/textarea/textarea';

@Component({
  selector: 'app-jwt-decoder',
  imports: [ButtonComponent, Textarea, JsonPipe],
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

  handleTokenChange(value: string) {
    this.token.set(value);
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
