import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ai-frontend-reviewer-external',
  imports: [],
  templateUrl: './ai-frontend-reviewer-external.html',
  styleUrl: './ai-frontend-reviewer-external.scss',
})
export class AiFrontendReviewerExternal {
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://daniieldvir.github.io/ai-frontend-code-reviewer/',
    );
  }
}
