import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterGalleryComponent } from './character-gallery.component';

describe('CharacterGalleryComponent', () => {
  let component: CharacterGalleryComponent;
  let fixture: ComponentFixture<CharacterGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
