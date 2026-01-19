import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MoviePage } from './pages/movie/movie';
import { SeriesPage } from './pages/series/series';
import { EpisodePage } from './pages/episode/episode';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'movie', component: MoviePage, title: 'Movie', data: { type: 'movie' } },
  { path: 'series', component: SeriesPage, title: 'Series', data: { type: 'series' } },
  { path: 'episode', component: EpisodePage, title: 'Episode', data: { type: 'episode' } },

  { path: '**', redirectTo: '' },
];
