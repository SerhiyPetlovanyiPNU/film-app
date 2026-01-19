import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface MovieResponse {
  Title: string;
  Poster: string;
  Year?: string;
  Response?: string;
  imdbID: string;
}

export interface SearchResult {
  Search: MovieResponse[];
  totalResults: string;
  Response: string;
}

export interface MovieDetailResponse extends MovieResponse {
  Plot: string;
  Actors: string;
  Director: string;
  Genre: string;
  Released: string;
  Runtime: string;
  imdbRating: string;
}

@Injectable({
  providedIn: 'root',
})
export class Movie {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMovie(title: string, type: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}?apikey=${this.apiKey}&t=${title}&type=${type}`,
    );
  }

  searchMovies(query: string, type: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(
      `${this.apiUrl}?apikey=${this.apiKey}&s=${query}&type=${type}`,
    );
  }

  getMovieDetails(id: string): Observable<MovieDetailResponse> {
    return this.http.get<MovieDetailResponse>(
      `${this.apiUrl}?apikey=${this.apiKey}&i=${id}&plot=full`,
    );
  }
}
