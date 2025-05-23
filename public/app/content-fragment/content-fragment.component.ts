import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-content-fragment',
  templateUrl: './content-fragment.component.html',
  styleUrls: ['./content-fragment.component.scss']
})
export class ContentFragmentComponent implements OnInit {

  /**
   * Texto: 0,
   * Imagen: 1,
   * Video: 2,
   * URL: 3
   */
  @Input() contentType: {key: number, value: string} = {key: 0, value: 'Texto'};
  @Input() content: string = "";

  contentFragmentTypes: {key: number, value: string}[] = [];

  safeUrl!: SafeResourceUrl;
  link!: string;
  linkParts: string[] = [];

  constructor(
    private sanitizer : DomSanitizer,
    private blogEntryService: BlogEntryService) { }

  ngOnInit(): void {
    this.contentFragmentTypes = this.blogEntryService.getContentFragmentTypes();
    
    // Videos
    if(this.contentType.key == 2) {
      // Get video ID from youtube url
      let videoId = this.content.split('v=')[1];

      // console.log(`Sanitizing video ID: ${videoId}`);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
    }

    // External link
    if(this.contentType.key == 3) {
      // The first part is the text and the second one is the link
      this.linkParts = this.content.split("#");
      // in case there are # in the link, concatenate them into one string
      for (let i = 2; i < this.linkParts.length; i++) {
        this.linkParts[1] += this.linkParts[i]
      }
    }
  }
}