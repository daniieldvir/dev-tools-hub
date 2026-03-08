import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonTools } from '../../features/json-tools/json-tools';
import { JwtDecoder } from '../../features/jwt-decoder/jwt-decoder';
import { RegexTester } from '../../features/regex-tester/regex-tester';

@Component({
  selector: 'app-feature-page',
  imports: [JsonTools, JwtDecoder, RegexTester],
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
