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

  entries: BlogEntry[] = [];

  password: string = "";

  adminAccess: boolean = false;
  passFailed: boolean = false;

  constructor(private blogEntryService: BlogEntryService, private cookiesService: CookiesService) { }

  ngOnInit(): void {
    this.adminAccess = false;
    // Find a session cookie if there is any stored
    let sessionCookie = this.cookiesService.getCookie("ADMIN");
    // Access when there is a session cookie stored. It does NOT verify the cookie password
    if(sessionCookie.length > 10) {
      this.adminAccess = true;
      // Gets the blog entries to show
      this.getBlogEntries();
    }
    else {
      this.adminAccess = false;
    }
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
    if(data.session) {
      this.cookiesService.setCookie("ADMIN", data.password, 2);
      this.adminAccess = true;
    }
    else {
      console.log("Could not Login");
      this.passFailed = true;
    }
  }

}
