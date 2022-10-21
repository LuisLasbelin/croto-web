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
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.blogEntryService.getBlogEntry(id)
      .subscribe((_entry) => {
        this.entry = {
          id: _entry[0].id,
          title: decodeURI(_entry[0].title),
          tag: decodeURI(_entry[0].tag),
          content: this.blogEntryService.parseContent(_entry[0].content),
          date: _entry[0].date,
          brief: decodeURI(_entry[0].brief),
          frontImageURL: _entry[0].frontImageURL,
          frontImageAlt: decodeURI(_entry[0].frontImageAlt)
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
    window.location.href = '/landing'
  }

}
