import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.css'
})
export class CancelComponent {
  constructor(private authService: AuthService, private _router: Router) {
  }
  
  ngOnInit() {
    this.authService.signinSilent().then(() => {
      this._router.navigate(['/payment/planform']);
    });
  }
}
