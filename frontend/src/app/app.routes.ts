import { Routes } from '@angular/router';
import { AiFrontendReviewerExternal } from './features/ai-frontend-reviewer-external/ai-frontend-reviewer-external';
import { FeaturePage } from './pages/feature-page/feature-page';
import { FavoritePage } from './pages/favorite-page/favorite-page';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'favorites',
    component: FavoritePage,
  },
  {
    path: 'feature/ai_code_reviewer',
    component: AiFrontendReviewerExternal,
  },
  {
    path: 'feature/:id',
    component: FeaturePage,
  },
];
