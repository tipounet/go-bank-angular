import {Component} from '@angular/core';

@Component({
  selector: 'about',
  styleUrls: ['./about.css'],
  templateUrl: './about.html'
})
export class About {
  version = {
    application: "1.0.0-SNAPSHOT",
    goversion: {
      Version: "go1.7.1",
      OS: "windows",
      Arch: "amd64"
    }
  }
}
