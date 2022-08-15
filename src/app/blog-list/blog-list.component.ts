import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { BlogEntry } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  entries!: BlogEntry[];

  constructor(private blogEntryService: BlogEntryService) {
  }

  ngOnInit(): void {
    console.log("Init page");
    this.blogEntryService.testFunction().subscribe({ next: response => {console.log(response);}});


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
