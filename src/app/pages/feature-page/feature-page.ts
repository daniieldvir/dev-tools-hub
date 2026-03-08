import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonFormatter } from '../../features/json-formatter/json-formatter';

@Component({
  selector: 'app-feature-page',
  imports: [JsonFormatter],
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
