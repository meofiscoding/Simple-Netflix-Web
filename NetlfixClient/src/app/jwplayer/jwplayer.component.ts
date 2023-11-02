import { Component } from '@angular/core';
declare var jwplayer: any;

@Component({
  selector: 'app-jwplayer',
  templateUrl: './jwplayer.component.html',
  styleUrls: ['./jwplayer.component.css']
})
export class JwplayerComponent {
  constructor() {}

  ngOnInit() {
    const playerJw = jwplayer('player').setup({
      // title: 'Player Test',
      file: 'https://storage.googleapis.com/cinema-movie/7escape/index.m3u8',
      // file: 'https://hdbo.opstream5.com/20231026/36104_669acff5/3000k/hls/mixed.m3u8',
      width: 640,
      height: 360,
      aspectratio: '16:9',
      mute: false,
      autostart: true,
      primary: 'html5',
    });
  }
}
