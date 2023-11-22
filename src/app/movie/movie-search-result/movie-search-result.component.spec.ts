import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchResultComponent } from './movie-search-result.component';

describe('MovieSearchResultComponent', () => {
  let component: MovieSearchResultComponent;
  let fixture: ComponentFixture<MovieSearchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSearchResultComponent]
    });
    fixture = TestBed.createComponent(MovieSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
