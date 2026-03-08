import { Routes } from '@angular/router';
import { FeaturePage } from './pages/feature-page/feature-page';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'feature/:id',
    component: FeaturePage,
  },
];
