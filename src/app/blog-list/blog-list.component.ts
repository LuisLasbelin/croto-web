import { Component, OnInit } from '@angular/core';
import { BlogEntry } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  entries: BlogEntry[] = [];

  constructor(private blogEntryService: BlogEntryService) {
  }

  ngOnInit(): void {
    console.log("Init page");

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
      // Change the date format to dd/mm/yyyy
      unformatEntries.forEach(entry => {

        // Get the date
        let date = entry.date.split('T');
        // Keep only the numbers
        let dateNums = date[0].split('/');

        this.entries.push({
          id: entry.id,
          tag: entry.tag,
          title: entry.title,
          content: entry.content,
          date: `${dateNums[2]}/${dateNums[1]}/${dateNums[0]}`,
          brief: entry.brief,
          frontImageURL: entry.frontImageURL,
          frontImageAlt: entry.frontImageAlt,
        })
      });
      
      // State the tag color for each
    })
  }
}
