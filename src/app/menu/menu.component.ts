import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private _authService: AuthService) { }
  public isUserAuthenticated: boolean = false;
  public isUserMember: boolean = false;
  public userAvatar: string = "";

  ngOnInit() {
    this._authService.loginChanged.subscribe(res => {
      this.isUserAuthenticated = res;
      // check if user is member
      this._authService.checkIfUserIsMember()
        .then(res => {
          this.isUserMember = res;
        })
    });

    this.createUserAvatar();
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
