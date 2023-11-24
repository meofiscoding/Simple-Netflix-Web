import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { ApiserviceService } from 'src/app/shared/services/apiservice.service';
import Hls from 'hls.js';

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.css']
})
export class MoviePlayerComponent {
  // access the declared DOM element; expose all methods and properties
  @ViewChild('videoPlayer') videoElementRef!: ElementRef;

  // declare and inherit the HTML video methods and its properties
  videoElement!: HTMLVideoElement;
  movieId: string;
  isSeries: boolean = false;
  thumbnail: string = "";
  streamingUrls: any = [];
  currentUrl: any = "";
  screenWidth: number = 0;
  screenHeight: number = 0;
  appMenuHeight = 0; // initialize with 0
  hlsPlayer = new Hls();

  constructor(private apiService: ApiserviceService) {
    this.movieId = "";
  }

  ngAfterViewInit() {
    // the element could be either a wrapped DOM element or a nativeElement
    this.videoElement = this.videoElementRef?.nativeElement;
    this.movieId = history.state.data;
    // get screen width
    this.screenWidth = window.innerWidth;
    // get screen height
    this.screenHeight = window.innerHeight;
    this.appMenuHeight = document.querySelector('app-menu')?.clientHeight ?? 0;

    this.apiService.getData(Constants.moviesApi + "/" + this.movieId).subscribe((data: any) => {
      this.streamingUrls = data.streamingUrls;
      if(!this.streamingUrls){
        console.log("No streaming urls found");
      }
      this.currentUrl = Object.values(this.streamingUrls)[0];
      this.isSeries = data.isSeries;
      this.thumbnail = data.poster ?? './assets/images/blank_thumbnail.png'

      // check if hls is supported
      if (Hls.isSupported()) {
        console.log("Video streaming supported by HLSjs")

        // create hls player
        this.changeEpisode(0);
        // resize video element
        this.videoElement.width = this.screenWidth;
        this.videoElement.height = this.screenHeight - this.appMenuHeight;
      }

      // get first element of streamingUrls object
      // this.playerJw = jwplayer('player').setup({
      //   // title: 'Player Test',
      //   file: this.currentUrl,
      //   width: this.screenWidth,
      //   height: this.screenHeight - this.appMenuHeight,
      //   // aspectratio: '16:9',
      //   mute: false,
      //   autostart: true,
      //   primary: 'html5',
      // });
    });
  }

  changeEpisode(episodeNumber: number) {
    this.currentUrl = Object.values(this.streamingUrls)[episodeNumber];
    this.hlsPlayer.loadSource(this.currentUrl);
    this.hlsPlayer.attachMedia(this.videoElement);
    this.hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
      // play video
      this.videoElement.play();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Update dimensions on window resize
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    // set width and height of video element
    this.videoElement.width = this.screenWidth;
    this.videoElement.height = this.screenHeight - this.appMenuHeight;
  }
}


