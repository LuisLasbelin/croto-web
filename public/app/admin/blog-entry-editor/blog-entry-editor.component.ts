import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogEntry, ContentFragment } from 'public/defs/blogentry';
import { Session } from 'public/defs/session';
import { BlogEntryService } from '../../service/blog-entry.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-blog-entry-editor',
  templateUrl: './blog-entry-editor.component.html',
  styleUrls: ['./blog-entry-editor.component.scss']
})
export class BlogEntryEditorComponent implements OnInit {

  session: Session = {session: false, password: ""};

  id: string = "";
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
    private location: Location,
    private readonly router: Router) { }

  ngOnInit(): void {

    // Check if you are allowed
    this.blogEntryService
      .login()
      .then(() => console.log("Log in"))
      .catch((e: { message: any; }) => console.log(e.message));

    // preparations
    this.tags = this.blogEntryService.getBlogEntryTags();
    this.contentFragmentTypes = this.blogEntryService.getContentFragmentTypes();
    this.newFragmentType = 0;

    // Check if it is called to edit
    this.id = "";
    // When it is undefined = 0
    this.id = String(this.route.snapshot.paramMap.get('id'));
    if(this.id != "null") {
      console.log("Editing")
      this.blogEntryService.getBlogEntry(this.id).subscribe(entry => {
        let _entry = entry.payload.data()
        console.log(_entry.content)

        this.content = this.blogEntryService.parseContent(_entry.content);
        this.title = _entry.title;
        this.tag = _entry.tag;
        this.date = _entry.date;
        this.brief = _entry.brief;
        this.frontImageAlt = _entry.frontImageAlt;
        this.frontImageURL = _entry.frontImageURL;
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
    // console.log("Adding content fragment: " + this.newFragmentType);
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
    // console.log("New blog entry");
    // console.log(this.content);
    if(this.title.length > 0 && this.content.length > 0) {
      // Editing an entry
      // console.log(this.id)
      if(this.id != "null") {
        this.blogEntryService.editBlogEntry(this.id,{
          password: this.session.password,
          title: this.title, 
          tag: this.tag,
          content: this.content,
          date: this.date,
          frontImageURL: this.frontImageURL, 
          frontImageAlt: this.frontImageAlt, 
          brief: this.brief
        })
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
      }
    }
    else {
      // console.log("No se puede crear una entrada sin título o sin contenido");
    }
  }

  addLink(index: number) {
    let linkString: string = '<a href="ENLACE" target="_blank" rel="noopener noreferrer" class="link"><span>NOMBRE</span></a>';

    this.content[index].content += linkString;
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
