import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogEntry, ContentFragment } from 'public/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-viewer',
  templateUrl: './blog-viewer.component.html',
  styleUrls: ['./blog-viewer.component.scss']
})
export class BlogViewerComponent implements OnInit {

  entry!: BlogEntry;
  url: string = '';
  constructor(
    private route: ActivatedRoute,
    private blogEntryService: BlogEntryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBlogEntry();
    this.url = window.location.href;
  }
  
  getBlogEntry(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.blogEntryService.getBlogEntry(id)
      .subscribe((data) => {
        let _entry = data.payload.data()
        this.entry = {
          id: _entry.id,
          title: decodeURI(_entry.title),
          tag: decodeURI(_entry.tag),
          content: this.blogEntryService.parseContent(_entry.content),
          date: _entry.date,
          brief: decodeURI(_entry.brief),
          frontImageURL: _entry.frontImageURL,
          frontImageAlt: decodeURI(_entry.frontImageAlt)
        }
        // for each fragment content
        for (let i = 0; i < this.entry.content.length; i++) {
          // if a fragment is text: decodeURI
          if(this.entry.content[i].type.key == 0) {
            this.entry.content[i].content = decodeURI(this.entry.content[i].content);
          }
        };

        if(this.entry.frontImageURL == "") {
          this.entry.frontImageURL = '../../assets/Imágenes/Eclipse.png';
          this.entry.frontImageAlt = 'Eclipse de lunas'
        }

        // console.log(this.entry);
      });
  }

  goBack(): void {
    window.location.href = '/'
  }

}
