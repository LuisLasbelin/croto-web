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

  constructor(private blogEntryService: BlogEntryService, private cookiesService: CookiesService) { }

  ngOnInit(): void {
    let sessionCookie = this.cookiesService.getCookie("ADMIN");

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
    if(data.session) {
      this.cookiesService.setCookie("ADMIN", data.password, 2);
      this.adminAccess = true;
    }
    else {
      console.log("Could not Login");
    }
  }

}
