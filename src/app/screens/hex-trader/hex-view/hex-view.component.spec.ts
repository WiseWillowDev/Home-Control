import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexViewComponent } from './hex-view.component';

describe('HexViewComponent', () => {
  let component: HexViewComponent;
  let fixture: ComponentFixture<HexViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HexViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
