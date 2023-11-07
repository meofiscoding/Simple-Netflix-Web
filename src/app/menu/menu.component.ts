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

  ngOnInit() {
    this._authService.loginChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }
  
  login() {
    this._authService.login();
  }
  
  public logout = () => {
    this._authService.logout();
  }
}
