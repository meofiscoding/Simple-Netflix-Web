import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, from, lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Constants } from '../constants';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.apiRoot)) {
      return from(
        this._authService.getAccessToken().then((token) => {
          const headers = req.headers.set('Authorization', `Bearer ${token}`);
          const authReq = req.clone({ headers });
          debugger;
          // if response is 404 and user is not logged in, redirect to login page, else redirect to home page
          return lastValueFrom(next.handle(authReq))
            .then((res) => {
              return res;
            })
            .catch((err) => {
              if (err.status == 401 || token == "") {
                this._authService.login();
              } else {
                // if user is not Member, redirect to home page
                this._authService.checkIfUserIsMember().then((isMember) => {
                  if (!isMember) {
                    this._router.navigate(['/home']);
                  }
                  else {
                    this._router.navigate(['/movies']);
                  }
                });
              }
              return err;
            });
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
