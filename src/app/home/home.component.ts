import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public _authService: AuthService, private _router: Router) { }
  isMember: boolean = false;
  isUserAuthenticated: boolean = false;

  ngOnInit() {
    this._authService.isAuthenticated().then((isAuth) => {
      this.isUserAuthenticated = isAuth;
    });

    this._authService.checkIfUserIsMember().then((isMember) => {
      this.isMember = isMember;
      if (isMember) {
        this._router.navigate(['/movies']);
      }
    });
  }

  ngAfterViewInit() {
    console.log(this.isMember);
    console.log(this.isUserAuthenticated)
    document.querySelector('body')?.classList.add('bg-home');
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('bg-home');
  }
}
