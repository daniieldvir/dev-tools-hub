import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Base64 } from '../../features/base64/base64';
import { ColorConverter } from '../../features/color-converter/color-converter';
import { JsonTools } from '../../features/json-tools/json-tools';
import { JwtDecoder } from '../../features/jwt-decoder/jwt-decoder';
import { PasswordGenerator } from '../../features/password-generator/password-generator';
import { RegexTester } from '../../features/regex-tester/regex-tester';
import { TimestampConverter } from '../../features/timestamp-converter/timestamp-converter';
import { UuidGenerator } from '../../features/uuid-generator/uuid-generator';

@Component({
  selector: 'app-feature-page',
  imports: [
    JsonTools,
    JwtDecoder,
    RegexTester,
    PasswordGenerator,
    Base64,
    UuidGenerator,
    ColorConverter,
    TimestampConverter,
  ],
  templateUrl: './feature-page.html',
  styleUrl: './feature-page.scss',
})
export class FeaturePage {
  private activeRoute = inject(ActivatedRoute);

  public featureId = signal<string>('');

  constructor() {
    this.activeRoute.params.subscribe((params) => {
      this.featureId.set(params['id']);
    });
  }
}
