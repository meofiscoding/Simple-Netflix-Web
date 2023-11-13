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

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      return from(
        this._authService.getAccessToken().then((token) => {
          const headers = req.headers.set('Authorization', `Bearer ${token}`);
          const authReq = req.clone({ headers });
          // if response is 404 and user is not logged in, redirect to login page, else redirect to home page
          return lastValueFrom(next.handle(authReq))
            .then((res) => {
              return res;
            })
            .catch((err) => {
              if (err.status == 401 && token == "") {
                this._authService.login();
              } else {
                this._router.navigate(['/home']);
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
