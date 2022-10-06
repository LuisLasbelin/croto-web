import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMundiFullComponent } from './mapa-mundi-full.component';

describe('MapaMundiFullComponent', () => {
  let component: MapaMundiFullComponent;
  let fixture: ComponentFixture<MapaMundiFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMundiFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMundiFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
