import { Component, OnInit } from '@angular/core';
import { BlogEntryService } from 'src/app/service/blog-entry.service';
import { CookiesService } from 'src/app/service/cookies.service';
import { Session } from 'src/defs/session';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  session: Session = {session: false};

  password: string = "";

  constructor(private bogEntryService: BlogEntryService, private cookiesService: CookiesService) { }

  ngOnInit(): void {
    let sessionCookie = this.cookiesService.getCookie("SESSION");
    if(sessionCookie != "") {
      this.session = {session: true}
    }
  }

  login() {
    this.bogEntryService.login(this.password).subscribe(data => this.afterLogin(data as Session));
  }

  afterLogin(data: Session) {
    this.session = data;
    this.cookiesService.setCookie("SESSION", "true", 2);
  }

}
