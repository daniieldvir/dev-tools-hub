import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { FeatcurePage } from './pages/featcure-page/featcure-page';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'feature',
    component: FeatcurePage
  }
];
