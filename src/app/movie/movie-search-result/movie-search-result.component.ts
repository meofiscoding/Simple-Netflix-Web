import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieSearchResultDto } from 'src/app/_interface/movies/search/movieSearchResultDto.model';
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
  pageSize = Constants.pageSize;
  moviesResult: any = [];
  totalResult: number = 0;
  categoryTitle: any = '';
  constructor(private _route: ActivatedRoute, private _router: Router, private _apiservice: ApiserviceService) { }

  ngOnInit() {
    // receive all query params from the URL
    this._route.queryParams.subscribe(params => {
      console.log(params);
      // map elements from params to queryParams
      this.queryParams = {
        Category: params["category"] ?? null,
        Query: params["query"] ?? '',
        Page: 1
      };

      if (this.queryParams.Category) {
        // get the category title
        this._apiservice.getData(`category/${this.queryParams.Category}`).subscribe((category: any) => {
          this.categoryTitle = `All movies in ${category.category} category`;
        });
      }
      const httpParams = new HttpParams({ fromObject: this.queryParams });
      // search movies based on the query params
      this._apiservice.getData(Constants.moviesSearchApi, { params: httpParams }).subscribe((res: MovieSearchResultDto) => {
        console.log(res);
        this.moviesResult = res.data;
        this.totalResult = res.totalResult;
      });
    });
  }

  onPageChanged($event: PageEvent) {
     // Fetch the data for the selected page
      this.queryParams.Page = $event.pageIndex + 1;
      const httpParams = new HttpParams({ fromObject: this.queryParams });
      this._apiservice.getData(Constants.moviesSearchApi, { params: httpParams }).subscribe((res: MovieSearchResultDto) => {
        console.log(res);
        this.moviesResult = res.data;
        this.totalResult = res.totalResult;
      });
  }
}
