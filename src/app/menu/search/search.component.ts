import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieSearchResultDto } from 'src/app/_interface/movies/search/movieSearchResultDto.model';
import { Constants } from 'src/app/shared/constants';
import { ApiserviceService } from 'src/app/shared/services/apiservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  results: MovieSearchResultDto | undefined;

  searchRequestSubscriptions: Subscription[] = [];
  searchTerm: string = '';

  constructor(private apiservice: ApiserviceService) { 
  }

  onTextChange(changedText: string) {
    this.searchTerm = changedText;
    this.cancelPendingRequests();
    const starWarsSubscription = this.apiservice
      .getData(Constants.moviesSearchApi, { params: { query: changedText } })
      .subscribe((res: MovieSearchResultDto) => {
        this.results = res;
      });
    this.searchRequestSubscriptions.push(starWarsSubscription);
  }

  cancelPendingRequests() {
    this.searchRequestSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
