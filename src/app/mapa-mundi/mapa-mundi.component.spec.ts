import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMundiComponent } from './mapa-mundi.component';

describe('MapaMundiComponent', () => {
  let component: MapaMundiComponent;
  let fixture: ComponentFixture<MapaMundiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMundiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMundiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
