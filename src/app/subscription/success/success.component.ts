import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  constructor(private authService: AuthService, private _router: Router){
  }

  ngOnInit(){
    this.authService.signinSilent().then(() => {
      this._router.navigate(['/movies']);
    });
  }
}
