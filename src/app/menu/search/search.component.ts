import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieSearchResultDto } from 'src/app/_interface/movies/movieSearchResultDto.model';
import { Constants } from 'src/app/shared/constants';
import { ApiserviceService } from 'src/app/shared/services/apiservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  results: MovieSearchResultDto[] = [];

  searchRequestSubscriptions: Subscription[] = [];

  constructor(private apiservice: ApiserviceService) { }

  onTextChange(changedText: string) {
    this.cancelPendingRequests();
    const starWarsSubscription = this.apiservice
      .getData(Constants.moviesSearchApi, { params: { query: changedText } })
      .subscribe((res: any) => {
        this.results = res;
      });
    this.searchRequestSubscriptions.push(starWarsSubscription);
  }

  cancelPendingRequests() {
    this.searchRequestSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
