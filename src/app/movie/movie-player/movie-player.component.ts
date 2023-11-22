import { Component } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { ApiserviceService } from 'src/app/shared/services/apiservice.service';
declare var jwplayer: any;

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.css']
})
export class MoviePlayerComponent {
  movieId: string;
  streamingUrls: any = [];
  constructor(private apiService: ApiserviceService) {
    this.movieId = "";
  }
  ngOnInit() {
    this.movieId = history.state.data;
    // get screen width
    let screenWidth = window.innerWidth;
    // get screen height
    let screenHeight = window.innerHeight;
    // get app-menu height
    let appMenuHeight = document.querySelector('app-menu')?.clientHeight ?? 0;
    this.apiService.getData(Constants.moviesApi + "/" + this.movieId).subscribe((data: any) => {
      this.streamingUrls = data.streamingUrls;
      const playerJw = jwplayer('player').setup({
        // title: 'Player Test',
        file: this.streamingUrls[0],
        width: screenWidth,
        height: screenHeight - appMenuHeight,
        // aspectratio: '16:9',
        mute: false,
        autostart: true,
        primary: 'html5',
      });
    });
  }
}


