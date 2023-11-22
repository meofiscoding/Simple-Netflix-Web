import { Component, Input } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { ApiserviceService } from 'src/app/shared/services/apiservice.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css']
})
export class MovieCarouselComponent {
  @Input() categoryTitle: string;
  @Input() dataSourceUrl: string;
  moviesList: any = [];

  constructor(private apiService: ApiserviceService, private authService: AuthService) {
    this.categoryTitle = "";
    this.dataSourceUrl = "";
  }
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getData(this.dataSourceUrl).subscribe((data: any) => {
      this.moviesList = data;
      console.log(this.moviesList);
    });
  }
}
