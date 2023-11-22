import { Component } from '@angular/core';
import { ApiserviceService } from '../shared/services/apiservice.service';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  categories: any = [];
  moviesByCategory: any = [];

  constructor(private _apiService: ApiserviceService) {
    // TODO: implement later
    // this.categories = ["My List"];
  }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this._apiService.getData(Constants.moviesCategoriesApi).subscribe(res => {
      // append the categories to the list
      this.categories = this.categories.concat(res);
      this.moviesByCategory = this.categories.map((category: any) => {
        return {
          title: category,
          dataSourceUrl: `${Constants.moviesApi}?tag=${category}`
        };
      });
    });
  }
}
