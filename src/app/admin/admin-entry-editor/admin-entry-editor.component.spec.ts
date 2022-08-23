import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntryEditorComponent } from './admin-entry-editor.component';

describe('AdminEntryEditorComponent', () => {
  let component: AdminEntryEditorComponent;
  let fixture: ComponentFixture<AdminEntryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEntryEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEntryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
