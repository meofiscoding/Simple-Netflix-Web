import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`
})
export class SigninRedirectCallbackComponent {
  public isUserMember: boolean = false;
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authService.finishLogin().then(() => {
      this.isMember().then(() => {
        if (this.isUserMember) {
          this._router.navigate(['/'], { replaceUrl: true }); // replace url = true to remove signin-redirect-callback from navigation stack
        } else {
          this._router.navigate(['/payment/planform']);
        }
      })
    })
  }

  public isMember = () => {
    return this._authService.checkIfUserIsMember()
      .then(res => {
        this.isUserMember = res;
      })
  }
}
