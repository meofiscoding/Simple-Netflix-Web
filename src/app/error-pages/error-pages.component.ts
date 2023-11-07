import { Component } from '@angular/core';

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.css']
})
export class ErrorPagesComponent {
  public notFoundText: string = `404 SORRY COULDN'T FIND IT!!!`
}
