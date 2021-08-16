import { Component, OnInit } from '@angular/core';
import { Movie } from './model/movie';
import { MovieListResponse } from './model/movie-list-response';
import { MoviesService } from './service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  initialPageCount = 3;

  constructor(private service: MoviesService) { }

  ngOnInit(): void {
    this.initMovies();
  }

  initMovies(): void {
    for (let i=0; i<this.initialPageCount; i++) {
      this.loadMoreMovies();
    }
  }

  loadMoreMovies(): void {
    this.currentPage++;

    this.service.getPopularMovies(this.currentPage).subscribe((moviesList: MovieListResponse) => {
      moviesList.results.forEach(m => {
        m.poster_path = 'https://image.tmdb.org/t/p/w500' + m.poster_path;
        return m;
      });
      this.movies = this.movies.concat(moviesList.results);
      this.totalPages = moviesList.total_pages;
    });
  }
}
