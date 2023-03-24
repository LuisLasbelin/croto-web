import { Location } from '@angular/common';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BlogEntryService } from '../service/blog-entry.service';

import { BlogViewerComponent } from './blog-viewer.component';

describe('BlogViewerComponent', () => {
  let component: BlogViewerComponent;
  let fixture: ComponentFixture<BlogViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        BlogViewerComponent,
      ],
      providers: [
        BlogEntryService,
        ActivatedRoute
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject(
    [],
    () => {
      expect(component).toBeTruthy();
    }
  ));
});
