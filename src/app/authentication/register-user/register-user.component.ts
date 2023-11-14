import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForRegistrationDto } from 'src/app/_interface/user/userForRegistrationDto.model';
import { Constants } from 'src/app/shared/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  public errorMessage: string = '';
  public showError: boolean = false;
  registerForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private _router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched;
  }

  public hasError = (controllerName: string, errorName: string) => {
    return this.registerForm.controls[controllerName].hasError(errorName);
  }

  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };
    const userForRegistration: UserForRegistrationDto = {
      email: formValues.email,
      password: formValues.password
    };

    this.authService.register(Constants.registerApi, userForRegistration)
      .subscribe({
        next: () => {
          console.log('User is registered');
          // go to login page
          this._router.navigate(['/planform']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
  }
}
