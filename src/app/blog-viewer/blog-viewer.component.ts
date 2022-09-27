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
        // Get the date
        let date = entry[0].date.split('T');
        // Keep only the numbers
        let dateNums = date[0].split('/');
        this.entry = {
          id: entry[0].id,
          title: entry[0].title,
          tag: entry[0].tag,
          content: this.blogEntryService.parseContent(entry[0].content),
          date: `${dateNums[2]}/${dateNums[1]}/${dateNums[0]}`,
          // TODO: add params from database
          brief: entry[0].brief,
          frontImageURL: entry[0].frontImageURL,
          frontImageAlt: entry[0].frontImageAlt
        }
        console.log(this.entry);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
