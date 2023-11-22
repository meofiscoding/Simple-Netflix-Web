import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePlayerComponent } from './movie-player.component';

describe('MoviePlayerComponent', () => {
  let component: MoviePlayerComponent;
  let fixture: ComponentFixture<MoviePlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviePlayerComponent]
    });
    fixture = TestBed.createComponent(MoviePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
