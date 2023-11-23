import { Component } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {
  isInputToggled: boolean = false;

  toggleInput() {
    this.isInputToggled = !this.isInputToggled;
    if (this.isInputToggled) {
      // set margin-left of img tag to 300px
      document.getElementsByClassName("img")[0].setAttribute("style", "margin-left: -290px");
    }else {
      document.getElementsByClassName("img")[0].setAttribute("style", "margin-left: 0px");
    }
  }
}
