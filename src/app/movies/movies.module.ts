import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { MoviesService } from './service/movies.service';
import { MoviePosterComponent } from './components/movie-poster/movie-poster.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
    { path: '', component: MoviesComponent }
];

@NgModule({
  declarations: [
    MoviesComponent,
    MoviePosterComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild(routes),

    // Application modules
    CoreModule
  ],
  providers: [MoviesService]
})
export class MoviesModule { }
