import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BlogEntryService } from '../service/blog-entry.service';

@Component({
  selector: 'app-content-fragment',
  templateUrl: './content-fragment.component.html',
  styleUrls: ['./content-fragment.component.scss']
})
export class ContentFragmentComponent implements OnInit {

  @Input() contentType: {key: number, value: string} = {key: 0, value: 'Texto'};
  @Input() content: string = "";

  contentFragmentTypes: {key: number, value: string}[] = [];

  safeUrl!: SafeResourceUrl;

  constructor(
    private sanitizer : DomSanitizer,
    private blogEntryService: BlogEntryService) { }

  ngOnInit(): void {
    this.contentFragmentTypes = this.blogEntryService.getContentFragmentTypes();

    if(this.contentType.key == 2) {
      // Get video ID from youtube url
      let videoId = this.content.split('v=')[1];

      console.log(`Sanitizing video ID: ${videoId}`);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
    }
  }
}