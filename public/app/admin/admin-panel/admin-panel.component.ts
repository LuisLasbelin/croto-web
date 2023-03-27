import { Component, OnInit } from '@angular/core';
import { BlogEntryService } from 'public/app/service/blog-entry.service';
import { CookiesService } from 'public/app/service/cookies.service';
import { BlogEntry } from 'public/defs/blogentry';
import { Session } from 'public/defs/session';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  entries: BlogEntry[] = [];

  password: string = "";
  email: string = "";

  adminAccess: boolean = false;
  passFailed: boolean = false;

  constructor(private blogEntryService: BlogEntryService, private cookiesService: CookiesService) { }

  ngOnInit(): void {
    this.adminAccess = false;
    this.passFailed = false;
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
    this.blogEntryService.login(this.password, this.email)
    .then(() => this.afterLogin(this.password, this.email))
    .catch((e: { message: any; }) => console.log(e.message));
  }

  afterLogin(_password: string, _email: string) {
    if(_password) {
      this.cookiesService.setCookie("ADMIN-PASS", _password, 2);
      this.cookiesService.setCookie("ADMIN-EMAIL", _email, 2);
      this.adminAccess = true;
    }
    else {
      // console.log("Could not Login");
      this.passFailed = true;
    }
  }

}
