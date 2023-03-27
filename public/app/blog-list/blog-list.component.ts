import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogEntry } from 'public/defs/blogentry';
import { GlobalVariables } from '../common/globals';
import { BlogEntryService } from '../service/blog-entry.service';
import { CookiesService } from '../service/cookies.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  entries: BlogEntry[] = [];
  canExpand: boolean = false;
  adminAccess: boolean = false;

  constructor(private blogEntryService: BlogEntryService, private cookiesService: CookiesService) {
  }

  ngOnInit(): void {
    this.canExpand = false;
    
    this.adminAccess = false;

    // Find a session cookie if there is any stored
    let sessionCookie = this.cookiesService.getCookie("ADMIN-EMAIL");
    // Access when there is a session cookie stored. It does NOT verify the cookie password
    if(sessionCookie.length > 5) {
      this.adminAccess = true;
    }
    else {
      this.adminAccess = false;
    }

    this.getBlogEntries();

  }

  /**
   * Get all blog entries from the server.
   * @returns BlogEntry[]
   */
  getBlogEntries() {
    this.blogEntryService.getBlogEntries().subscribe((res: any) => {
      console.debug("Entry");
      let unformatEntries = res;
      // Check if the blog list is too big and can be expanded
      if(unformatEntries.length > 3) this.canExpand = true;
      // If there are not 3, style make it fit content
      if(unformatEntries.length < 3) {
        let blogList = document.getElementById('blog-list');
        if(blogList) blogList.style.height = 'fit-content';
      }

      // Format entries
      unformatEntries.forEach((entry: any) => {
        let data = entry.payload.doc.data()
        console.log(entry.payload.doc.id)
        // Date in text
        let dateText = this.blogEntryService.parseDate(data.date);

        // If there is no front image URL, set one default
        if(data.frontImageURL == "") {
          data.frontImageURL = '../../assets/Imágenes/Eclipse.png';
          data.frontImageAlt = 'Eclipse de lunas'
        }

        this.entries.push({
          id: entry.payload.doc.id,
          tag: decodeURI(data.tag),
          title: decodeURI(data.title),
          // in this case we don't need to decode de content bcs it will not be shown
          content: data.content,
          date: dateText,
          brief: decodeURI(data.brief),
          frontImageURL: data.frontImageURL,
          frontImageAlt: decodeURI(data.frontImageAlt),
        })

        // End loading
        GlobalVariables.setLoadingStatus(false);
      });
    })
  }

  /**
   * Expands the list to show more results
   */
  expand() {
    let container = document.getElementById('blog-list');
    container?.classList.add('expanded');
    this.canExpand = false;
  }

  /**
   * Contracts the blog list
   */
  contract() {
    let container = document.getElementById('blog-list');
    container?.classList.remove('expanded');
    this.canExpand = true;
  }

  deleteEntry(id: string) {
    this.blogEntryService.deleteBlogEntry(id)
  }
}
