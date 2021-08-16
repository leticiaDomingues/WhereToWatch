import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { MovieListResponse } from '../model/movie-list-response';

const API_KEY = 'ace71710de0fd2d9663545790dfc7f49';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends ApiService {
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getPopularMovies(page: number = 1): Observable<MovieListResponse> {
    // const url =  `discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
    const url =  'discover/movie';
    
    const params = new HttpParams({
      fromObject: {
        api_key: API_KEY,
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        include_adult: 'false',
        page: page,
        with_watch_monetization_types: 'flatrate'
      }
    });
    
    return this.get<MovieListResponse>(url, params);
  }
}
