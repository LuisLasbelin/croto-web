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

  session: Session = {session: false, password: ""};

  id: number = 0;
  content: ContentFragment[] = [];
  title: string = "";
  tags: string[] = [];
  tag: string = "";
  brief: string = "";
  frontImageURL: string = "";
  frontImageAlt: string = "";
  date: string = "";

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

    // Check if it is called to edit
    this.id = 0;
    // When it is undefined = 0
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id != 0) {
      this.blogEntryService.getBlogEntry(this.id).subscribe(entry => {
        this.content = this.blogEntryService.parseContent(entry[0].content),
        this.title = entry[0].title;
        this.tag = entry[0].tag;
        this.brief = entry[0].brief;
        this.frontImageAlt = entry[0].frontImageAlt;
        this.frontImageURL = entry[0].frontImageURL;
      })
      // Add a new fragment for every content fragment
      this.content.forEach(fragment => {
        this.addContentFragment(fragment.type, fragment.content);
      });
      // Select the current blog entry tag
      let tagSelector = document.getElementById('entry-tag') as HTMLSelectElement;
      tagSelector.value = this.tag;
    }
  }

  /**
   * Adds a new content fragment to the entry
   */
  addContentFragment(fragmentType?: {key: number, value: string}, content: string = "") {
    console.log("Adding content fragment: " + this.newFragmentType);
    // Only if there is no inserted fragment type
    if(fragmentType == undefined) fragmentType = this.contentFragmentTypes.find(type => type.key == this.newFragmentType);
   
    this.content.push({type: fragmentType, content: content} as ContentFragment);
  }

  /**
   * Removes a fragment from the content
   * @param fragmentIndex number of the fragment 
   */
  deleteContentFragment(fragmentIndex: number) {
    this.content.splice(fragmentIndex, 1);
  }

  /**
   * Adds a new blog entry to the database using form data
   */
  newBlogEntry() {
    console.log("New blog entry");
    console.log(this.content);
    if(this.title.length > 0 && this.content.length > 0) {
      // Editing an entry
      console.log(this.id)
      if(this.id > 0) {
        this.blogEntryService.editBlogEntry(this.id,{
          password: this.session.password,
          title: this.title, 
          tag: this.tag,
          content: this.content,
          date: this.date,
          frontImageURL: this.frontImageURL, 
          frontImageAlt: this.frontImageAlt, 
          brief: this.brief
        }).subscribe(entry => {
          console.log(`Entrada editada con id = ${entry.id}`);
          this.back();
        });
      }
      // Actual new entry
      else {
        this.blogEntryService.addBlogEntry({
          password: this.session.password,
          title: this.title, 
          tag: this.tag, 
          content: this.content, 
          date: this.date, 
          frontImageURL: this.frontImageURL, 
          frontImageAlt: this.frontImageAlt, 
          brief: this.brief})
          .subscribe(entry => {
            console.log(`Entrada creada con id = ${entry.id}`);
            this.back();
          });
      }
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
