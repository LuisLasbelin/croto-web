import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogEntry } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-entry-editor',
  templateUrl: './blog-entry-editor.component.html',
  styleUrls: ['./blog-entry-editor.component.scss']
})
export class BlogEntryEditorComponent implements OnInit {

  content: string = "";
  title: string = "";
  tags: string[] = [];
  tag: string = "";

  constructor(    
    private route: ActivatedRoute,
    private blogEntryService: BlogEntryService,
    private location: Location) { }

  ngOnInit(): void {
    this.tags = this.blogEntryService.getBlogEntryTags();
  }

  newBlogEntry() {
    console.log("Title: " + this.title);
    if(this.title.length > 0 && this.content.length > 0) {
      // DATE //
      let date : Date = new Date();
      let dateString : string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`; 
      ////////////////////////////////////////////////////////////////
      this.blogEntryService.addBlogEntry({title: this.title, tag: this.tag, content: this.content, updated: dateString} as BlogEntry)
        .subscribe(entry => {
          console.log(`Entrada creada con id = ${entry.id}`);
          this.back();
        });
    }
    else {
      console.log("No se puede crear una entrada sin título o sin contenido");
    }
  }

  back() {
    this.location.back();
  }

}
