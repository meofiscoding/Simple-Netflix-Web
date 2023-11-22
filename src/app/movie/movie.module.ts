import { NgModule } from '@angular/core';
import { MovieComponent } from './movie.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { MoviePlayerComponent } from './movie-player/movie-player.component';

@NgModule({
  declarations: [MovieComponent, MovieCarouselComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MovieComponent },
      { path: 'movies/:id', component: MoviePlayerComponent}
    ])
  ]
})
export class MovieModule { }
