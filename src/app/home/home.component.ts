import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ngAfterViewInit(){
    document.querySelector('body')?.classList.add('bg-home');
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('bg-home');
  }
}
