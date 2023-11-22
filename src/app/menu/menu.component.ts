import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ApiserviceService } from '../shared/services/apiservice.service';
import { Constants } from '../shared/constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private _authService: AuthService, private _apiService: ApiserviceService, private _router: Router) { }
  public isUserAuthenticated: boolean = false;
  public isUserMember: boolean = false;
  public userAvatar: string = "";
  public moviesCategories: any = [];
  public isInMoviesPage: boolean = false;

  ngOnInit() {
    this._authService.loginChanged.subscribe(res => {
      this.isUserAuthenticated = res;
      if (this.isUserAuthenticated) {
        this.createUserAvatar();
      }
      // check if user is member
      this._authService.checkIfUserIsMember()
        .then(res => {
          this.isUserMember = res;
          if (this.isUserMember) {
            this.getMovieCategories();
          }
        })
    });

    // track current route
    this._router.events.subscribe((val) => {
      console.log(this._router.url);
      // if current url is http://localhost:4200/movies only then show categories
      if (this._router.url == "/movies") {
        this.isInMoviesPage = true;
      } else {
        this.isInMoviesPage = false;
        // if route url is sub route of movies, then set background color of app-menu to black
        if (this._router.url.includes("/movies/")) {
          document.querySelector('app-menu')?.classList.add('bg-dark');
        } else {
          document.querySelector('app-menu')?.classList.remove('bg-dark');
        }
      }
    })
  }

  getMovieCategories() {
    this._apiService.getData(Constants.moviesCategoriesApi).subscribe(res => {
      console.log(res);
      this.moviesCategories = res;
    });
  }

  createUserAvatar() {
    // get usernames 
    this._authService.getCurretnUserName().then(res => {
      console.log(res);
      this.userAvatar = "https://api.dicebear.com/7.x/thumbs/png?seed=" + res + "&background=%230000ff&radius=50&size=100";
    })
  }

  login() {
    this._authService.login();
  }

  public logout = () => {
    this._authService.logout();
  }
}
