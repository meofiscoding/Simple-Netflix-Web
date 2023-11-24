import { Component } from '@angular/core';
import { ApiserviceService } from '../shared/services/apiservice.service';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  tags: any = [];
  moviesByTag: any = [];

  constructor(private _apiService: ApiserviceService) {
    // TODO: implement later
    // this.categories = ["My List"];
  }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this._apiService.getData(Constants.moviesTagsApi).subscribe(res => {
      debugger;
      // append the categories to the list
      this.tags = this.tags.concat(res);
      this.moviesByTag = this.tags.map((tag: any) => {
        return {
          title: tag,
          dataSourceUrl: `tag/${tag}`
        };
      });
    });
  }
}
