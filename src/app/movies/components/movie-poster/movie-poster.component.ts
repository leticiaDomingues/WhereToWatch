import { Component, Input } from '@angular/core';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent {
  @Input() movie: Movie = {} as Movie;

  constructor() { }
}
