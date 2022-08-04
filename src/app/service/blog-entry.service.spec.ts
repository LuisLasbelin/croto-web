import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BlogEntryService } from './blog-entry.service';

describe('BlogEntryService', () => {
  let service: BlogEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // IMPORTANT FOR TESTING HTTPCLIENT
      imports: [HttpClientTestingModule],
      providers: [
        BlogEntryService,
      ]
    });
    service = TestBed.inject(BlogEntryService);
  });

  it('should be created', inject(
    [HttpClient],
    () => {
      expect(service).toBeTruthy();
    }
  ));
});
