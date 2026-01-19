import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie, MovieResponse } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  movies: MovieResponse[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  selectedType: 'movie' | 'series' | 'episode' = 'movie';

  constructor(
    private movieService: Movie,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }

  onTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value as 'movie' | 'series' | 'episode';
    this.loadContent();
  }

  loadContent() {
    this.isLoading = true;
    this.movies = [];
    this.errorMessage = '';

    const titlesSource = environment[this.selectedType];
    const randomTitles = this.getRandomItems(titlesSource, 5);

    const requests = randomTitles.map((title) =>
      this.movieService.getMovie(title, this.selectedType),
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.movies = results.filter((m) => m && m.Response === 'True');

        if (this.movies.length != 5) {
          this.errorMessage = 'Data could not be found for the selected episodes. Try again.';
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error loading data';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  private getRandomItems(array: string[], count: number): string[] {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
