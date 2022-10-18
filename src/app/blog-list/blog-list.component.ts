import { Component, OnInit } from '@angular/core';
import { BlogEntry } from 'src/defs/blogentry';
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
    let sessionCookie = this.cookiesService.getCookie("ADMIN");
    // Access when there is a session cookie stored. It does NOT verify the cookie password
    if(sessionCookie.length > 10) {
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
      let unformatEntries = res as BlogEntry[];
      unformatEntries = unformatEntries.reverse();
      // Check if the blog list is too big and can be expanded
      if(unformatEntries.length > 3) this.canExpand = true;
      // If there are not 3, style make it fit content
      if(unformatEntries.length < 3) {
        let blogList = document.getElementById('blog-list');
        if(blogList) blogList.style.height = 'fit-content';
      }
      // Change the date format to dd/mm/yyyy
      unformatEntries.forEach(entry => {

        // Get the date
        let date = entry.date.split('T');
        // Keep only the numbers
        let dateNums = date[0].split('-');
        let dateText = this.blogEntryService.parseDate(`${dateNums[2]}/${dateNums[1]}/${dateNums[0]}`);

        // If there is no front image URL, set one default
        if(entry.frontImageURL == "") {
          entry.frontImageURL = '../../assets/Imágenes/Eclipse.png';
          entry.frontImageAlt = 'Eclipse de lunas'
        }

        this.entries.push({
          id: entry.id,
          tag: decodeURI(entry.tag),
          title: decodeURI(entry.title),
          // in this case we don't need to decode de content bcs it will not be shown
          content: entry.content,
          date: dateText,
          brief: decodeURI(entry.brief),
          frontImageURL: entry.frontImageURL,
          frontImageAlt: decodeURI(entry.frontImageAlt),
        })
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

  deleteEntry(id: number) {
    this.blogEntryService.deleteBlogEntry(id).subscribe((res: any) => {
      console.log("Entrada eliminada: " + id);
    })
  }
}
