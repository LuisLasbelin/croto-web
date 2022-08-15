import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogEntry } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-viewer',
  templateUrl: './blog-viewer.component.html',
  styleUrls: ['./blog-viewer.component.scss']
})
export class BlogViewerComponent implements OnInit {

  @Input('entry') entry!: BlogEntry;

  constructor(
    private route: ActivatedRoute,
    private blogEntryService: BlogEntryService,
    private location: Location
  ) {
    this.getBlogEntry();
  }

  ngOnInit(): void {
    
  }
  
  getBlogEntry(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogEntryService.getBlogEntry(id)
      .subscribe((entry: BlogEntry) => {
        this.entry = {
          id: entry.id,
          title: entry.title,
          tag: entry.tag,
          content: entry.content,
          date: entry.date
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
