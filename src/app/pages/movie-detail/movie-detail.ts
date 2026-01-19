import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieDetailResponse } from '../../services/movie';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail implements OnInit {
  movie: MovieDetailResponse | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private movieService: Movie,
    private location: Location,
    private cdr: ChangeDetectorRef,
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe((data) => {
        this.movie = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    }
  }
}
