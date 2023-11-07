import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-redirect-callback',
  template: `<div></div>`
})
export class SignoutRedirectCallbackComponent {
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authService.finishLogout().then(_ => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }
}
