import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private _authService: AuthService) { }
  public isAuthenticated: boolean = false;

  ngOnInit() {
  }
  
  login() {
    this._authService.login();
  }
}
