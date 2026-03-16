import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../shared/components/button/button';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, RouterModule, ButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);

  public onFavoritesClick() {
    this.router.navigate(['/favorites']);
  }

  public onHomeClick() {
    this.router.navigate(['/']);
  }

  public isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
