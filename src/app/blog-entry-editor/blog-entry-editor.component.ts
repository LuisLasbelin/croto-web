import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogEntry, ContentFragment } from 'src/defs/blogentry';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-blog-entry-editor',
  templateUrl: './blog-entry-editor.component.html',
  styleUrls: ['./blog-entry-editor.component.scss']
})
export class BlogEntryEditorComponent implements OnInit {

  content: ContentFragment[] = [];
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

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '148px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'content',
      class: 'content',
      tag: 'app-content-fragment',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
};

}
