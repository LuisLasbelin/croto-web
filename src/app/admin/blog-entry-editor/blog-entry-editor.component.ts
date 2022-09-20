import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogEntry, ContentFragment } from 'src/defs/blogentry';
import { Session } from 'src/defs/session';
import { BlogEntryService } from '../../service/blog-entry.service';

@Component({
  selector: 'app-blog-entry-editor',
  templateUrl: './blog-entry-editor.component.html',
  styleUrls: ['./blog-entry-editor.component.scss']
})
export class BlogEntryEditorComponent implements OnInit {

  session: Session = {session: false};

  content: ContentFragment[] = [];
  title: string = "";
  tags: string[] = [];
  tag: string = "";
  brief: string = "";
  frontImageURL: string = "";
  frontImageAlt: string = "";

  /// CONTENT FRAGMENT ///
  contentFragmentTypes: {key: number, value: string}[] = [];
  newFragmentType!: number;

  constructor(
    private route: ActivatedRoute,
    private blogEntryService: BlogEntryService,
    private location: Location) { }

  ngOnInit(): void {

    // Check if you are allowed
    this.blogEntryService.login().subscribe(result => {
      this.session = result as Session;
      // if the sessio is not correct, go away
      if(!this.session.session) {
        this.back();
      }
    });

    // preparations
    this.tags = this.blogEntryService.getBlogEntryTags();
    this.contentFragmentTypes = this.blogEntryService.getContentFragmentTypes();
    this.newFragmentType = 0;
  }

  /**
   * Adds a new content fragment to the entry
   */
  addContentFragment() {
    console.log("Adding content fragment: " + this.newFragmentType);
    let fragmentType = this.contentFragmentTypes.find(type => type.key == this.newFragmentType);
    this.content.push({type: fragmentType, content: ""} as ContentFragment);
  }

  /**
   * Adds a new blog entry to the database using form data
   */
  newBlogEntry() {
    console.log("New blog entry");
    console.log(this.content);
    if(this.title.length > 0 && this.content.length > 0) {
      // NOTE: Date is done by the server. This one is overwritten
      this.blogEntryService.addBlogEntry({id: 0, 
        title: this.title, 
        tag: this.tag, 
        content: this.content, 
        date: new Date().toDateString(), 
        frontImageURL: this.frontImageURL, 
        frontImageAlt: this.frontImageAlt, 
        brief: this.brief} as BlogEntry)
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
