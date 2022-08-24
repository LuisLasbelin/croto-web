import { Component, OnInit } from '@angular/core';
import { BlogEntryService } from 'src/app/service/blog-entry.service';
import { CookiesService } from 'src/app/service/cookies.service';
import { BlogEntry } from 'src/defs/blogentry';
import { Session } from 'src/defs/session';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  session: Session = {session: false};

  entries: BlogEntry[] = [];

  password: string = "";

  constructor(private blogEntryService: BlogEntryService, private cookiesService: CookiesService) { }

  ngOnInit(): void {
    let sessionCookie = this.cookiesService.getCookie("SESSION");
    if(sessionCookie != "") {
      this.session = {session: true}
    }

    this.getBlogEntries();

  }

  /**
   * Get all blog entries from the server.
   * @returns BlogEntry[]
   */
  getBlogEntries() {
    this.blogEntryService.getBlogEntries().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.entries.push(res[i]);
      }
    })
  }

  login() {
    this.blogEntryService.login(this.password).subscribe(data => this.afterLogin(data as Session));
  }

  afterLogin(data: Session) {
    this.session = data;
    this.cookiesService.setCookie("SESSION", "true", 2);
  }

}
