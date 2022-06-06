import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayText = false;
  text = 'Hello World!';

  onClickButton(): void {
    this.displayText = this.displayText ? false : true;
  }
}
