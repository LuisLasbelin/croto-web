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
  req$: any;

  constructor(private blogEntryService: BlogEntryService) {
    this.req$ = this.blogEntryService.testFunction();
    console.log(this.req$);
  }

  ngOnInit(): void {
    console.log("Init page");
    this.req$.subscribe({next: () => console.log("Fetched"), error: (error: any) => console.error(error)});

    //this.getBlogEntries();

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
