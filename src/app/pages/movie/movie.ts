import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { Movie, MovieResponse } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './movie.html',
  styleUrl: './movie.scss',
})
export class MoviePage implements OnInit {
  @Input() type: 'movie' | 'series' = 'movie';

  results: MovieResponse[] = [];
  isLoading = false;

  private searchSubject = new Subject<string>();

  constructor(
    private movieService: Movie,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.type = data['type'] || 'movie';

      this.results = [];
      this.isLoading = false;
    });

    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query.length < 3) return of(null);
          this.isLoading = true;
          return this.movieService.searchMovies(query, this.type);
        }),
      )
      .subscribe({
        next: (data) => {
          this.results = data?.Search || [];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.results = [];
          this.cdr.detectChanges();
        },
      });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }
}
