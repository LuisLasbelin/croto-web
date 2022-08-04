import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BlogEntryEditorComponent } from './blog-entry-editor.component';

describe('BlogEntryEditorComponent', () => {
  let component: BlogEntryEditorComponent;
  let fixture: ComponentFixture<BlogEntryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEntryEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEntryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject(
    [ActivatedRoute],
    () => {
      expect(component).toBeTruthy();
    }
  ));
});
