import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input() title: string = '';
  @Input() posterUrl: string = '';
  @Input() id: string = '';
}
