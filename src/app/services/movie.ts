import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface MovieResponse {
  Title: string;
  Poster: string;
  Year?: string;
  Response?: string;
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
}
