import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Movie } from './pages/movie/movie';
import { Series } from './pages/series/series';
import { Episode } from './pages/episode/episode';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'movie', component: Movie, title: 'Movie' },
  { path: 'series', component: Series, title: 'Series' },
  { path: 'episode', component: Episode, title: 'Episode' },

  { path: '**', redirectTo: '' },
];
