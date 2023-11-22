import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';
import { ApiserviceService } from 'src/app/shared/services/apiservice.service';

@Component({
  selector: 'app-movie-search-result',
  templateUrl: './movie-search-result.component.html',
  styleUrls: ['./movie-search-result.component.css']
})
export class MovieSearchResultComponent {
  queryParams: any = {
    Category: 0,
    Query: '',
  };
  moviesResult: any = [];
  categoryTitle: any = '';
  constructor(private _route: ActivatedRoute, private _router: Router, private _apiservice: ApiserviceService) { }

  ngOnInit() {
    // receive all query params from the URL
    this._route.queryParams.subscribe(params => {
      console.log(params);
      // map elements from params to queryParams
      this.queryParams = {
        Category: params["category"]??null,
        Query: params["query"]??'',
      };

      if(this.queryParams.Category){
        // get the category title
        this._apiservice.getData(`category/${this.queryParams.Category}`).subscribe((category: any) => {
          this.categoryTitle = `All movies in ${category.category} category`;
        });
      }
      const httpParams = new HttpParams({ fromObject: this.queryParams });
      // search movies based on the query params
      this._apiservice.getData(Constants.moviesSearchApi, {params: httpParams}).subscribe((res: any) => {
        console.log(res);
        this.moviesResult = res;
      });
    });

  }
}
