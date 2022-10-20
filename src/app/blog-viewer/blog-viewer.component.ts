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
          title: decodeURI(entry[0].title),
          tag: decodeURI(entry[0].tag),
          content: this.blogEntryService.parseContent(entry[0].content),
          date: entry.date,
          brief: decodeURI(entry[0].brief),
          frontImageURL: entry[0].frontImageURL,
          frontImageAlt: decodeURI(entry[0].frontImageAlt)
        }
        // for each fragment content
        for (let i = 0; i < this.entry.content.length; i++) {
          // if a fragment is text: decodeURI
          if(this.entry.content[i].type.key == 0) {
            this.entry.content[i].content = decodeURI(this.entry.content[i].content);
          }
        };

        console.log(this.entry);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
