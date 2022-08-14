import { Component, OnInit } from '@angular/core';
import { BlogEntry } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  entries!: BlogEntry[];

  constructor(private blogEntryService: BlogEntryService) {}

  ngOnInit(): void {

    this.blogEntryService.testFunction();

    this.getBlogEntries();

  }

  /**
   * Get all blog entries from the server.
   * @returns BlogEntry[]
   */
  getBlogEntries() {
    this.blogEntryService.getBlogEntries().subscribe(entries => {
      console.log(entries);
    })
  }
}
