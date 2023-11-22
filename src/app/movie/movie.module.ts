import { NgModule } from '@angular/core';
import { MovieComponent } from './movie.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { MoviePlayerComponent } from './movie-player/movie-player.component';
import { MovieSearchResultComponent } from './movie-search-result/movie-search-result.component';

@NgModule({
  declarations: [MovieComponent, MovieCarouselComponent, MovieSearchResultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MovieComponent },
      { path: 'search', component: MovieSearchResultComponent},
      { path: ':id', component: MoviePlayerComponent},
    ])
  ]
})
export class MovieModule { }
