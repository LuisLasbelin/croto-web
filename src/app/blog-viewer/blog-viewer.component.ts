import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogEntry, ContentFragment } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-viewer',
  templateUrl: './blog-viewer.component.html',
  styleUrls: ['./blog-viewer.component.scss']
})
export class BlogViewerComponent implements OnInit {

  entry!: BlogEntry;

  constructor(
    private route: ActivatedRoute,
    private blogEntryService: BlogEntryService,
    private location: Location
  ) {
    
  }

  ngOnInit(): void {
    this.getBlogEntry();
  }
  
  getBlogEntry(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogEntryService.getBlogEntry(id)
      .subscribe((entry) => {
        this.entry = {
          id: entry[0].id,
          title: entry[0].title,
          tag: entry[0].tag,
          content: this.blogEntryService.parseContent(entry[0].content),
          date: entry[0].date
        }
        console.log(this.entry);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
