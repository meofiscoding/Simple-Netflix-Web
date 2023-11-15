import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Constants } from '../constants';
import { Subject } from 'rxjs';
import { ApiserviceService } from './apiservice.service';
import { UserForRegistrationDto } from 'src/app/_interface/user/userForRegistrationDto.model';
import { RegistrationResponseDto } from 'src/app/_interface/response/registrationResponseDto.model';
import { HttpClient } from '@angular/common/http';

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
      scope: "openid profile movies payment", //  the list of supported scopes by Identity Service
      response_type: "code", // determines the flow we want to use (AllowedGrantTypes property on Identity Service)
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback` // the URI to redirect to after successful logout
    }
  }

  constructor(private apiService: ApiserviceService, private http: HttpClient) {
    this._userManager = new UserManager(this.idpSettings);
  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  public register = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto>(this.apiService.createCompleteRoute(route, Constants.idpAuthority), body);
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
        // console.log(user.access_token);
        return user;
      })
  }

  public logout = () => {
    this._userManager.signoutRedirect();
  }

  public getAccessToken = (): Promise<string> => {
    return this._userManager.getUser()
      .then(user => {
        if (!!user && !user.expired) {
          return user.access_token;
        } else {
          return "";
        }
      })
  }

  public finishLogout = () => {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  // check if user is Member role
  public checkIfUserIsMember = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        // Access role claim
        const roleClaim = user?.profile['role']
        console.log(roleClaim);
        return roleClaim === Constants.memberRole;
      })
  }

  // get current userId
  public getCurrentUserId = async (): Promise<string> => {
    const user = await this._userManager.getUser();
    // Access role claim
    const userId = user?.profile.sub;
    console.log(userId);
    return userId ?? '';
  }
}
