import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentFragmentType } from 'src/defs/blogentry';

@Component({
  selector: 'app-content-fragment',
  templateUrl: './content-fragment.component.html',
  styleUrls: ['./content-fragment.component.scss']
})
export class ContentFragmentComponent implements OnInit {

  @Input() contentType: ContentFragmentType = ContentFragmentType.Text;
  @Input() content: string = "";

  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    if(this.contentType == ContentFragmentType.Video) {
      // Get video ID from youtube url
      let videoId = this.content.split('v=')[1];

      console.log(`Sanitizing video ID: ${videoId}`);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
    }
  }
}