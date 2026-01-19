import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie, MovieResponse } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  movieData: MovieResponse | null = null;
  errorMessage: string = '';

  constructor(
    private movieService: Movie,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.searchMovie('Inception');
  }

  searchMovie(name: string) {
    this.movieService.getMovie(name).subscribe({
      next: (data) => {
        this.movieData = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Error load films';
        console.error(error);
      },
    });
  }
}
