import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtDecoderService } from '../../core/core/services/jwt-decoder-service';
import { Button } from '../../shared/components/button/button';



@Component({
  selector: 'app-jwt-decoder',
  imports: [FormsModule, JsonPipe, Button],
  templateUrl: './jwt-decoder.html',
  styleUrl: './jwt-decoder.scss',
})
export class JwtDecoder {
  token = '';

  constructor(public jwt: JwtDecoderService) {}

  decodeToken() {
    this.jwt.decode(this.token);
  }
}
