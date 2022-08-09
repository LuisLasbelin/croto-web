import { Component, OnInit } from '@angular/core';
import { BlogEntry } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  entries!: Observable<BlogEntry[]>;

  constructor(private blogEntryService: BlogEntryService) {}

  ngOnInit(): void {
    this.getBlogEntries();
  }

  /**
   * Get all blog entries from the server.
   * @returns BlogEntry[]
   */
  getBlogEntries() {
    var result : Observable<BlogEntry[]>;
    this.blogEntryService.getBlogEntries().subscribe(entries => {
      console.log(entries);
      result = of(this._mapToBlogEntry(entries));
      this.entries = result;
    })
  }

  private _mapToBlogEntry(array: any[]) {
    let result: BlogEntry[] = [];
    for (let i = 0; i < array.length; i++) {
      result.push({
        id: array[i].id,
        tag: array[i].tag,
        title: array[i].title,
        content: array[i].content,
        updated: array[i].updated
      })
    };
    return result;
  }
  
}
