import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Constants } from '../constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User | null = null;
  private _loginChangedSubject = new Subject<boolean>();

  public loginChanged = this._loginChangedSubject.asObservable();
  private get idpSettings(): UserManagerSettings {
    return {
      authority: Constants.idpAuthority, // the URI of the Identity Service
      client_id: Constants.clientId, // the id of the client that consumes the Identity Service
      redirect_uri: `${Constants.clientRoot}/signin-callback`, //  the URI to redirect to after successful authentication
      scope: "openid profile movies", //  the list of supported scopes by Identity Service
      response_type: "code", // determines the flow we want to use (AllowedGrantTypes property on Identity Service)
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback` // the URI to redirect to after successful logout
    }
  }

  constructor() {
    this._userManager = new UserManager(this.idpSettings);
  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        if (this._user !== user) {
          this._loginChangedSubject.next(this.checkUser(user));
        }

        this._user = user;

        return this.checkUser(user);
      })
  }

  private checkUser = (user: User | null): boolean => {
    return !!user && !user.expired;
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
    .then(user => {
      this._loginChangedSubject.next(this.checkUser(user));
      return user;
    })
  }
}
