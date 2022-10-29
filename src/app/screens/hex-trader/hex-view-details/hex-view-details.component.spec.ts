import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexViewDetailsComponent } from './hex-view-details.component';

describe('HexViewDetailsComponent', () => {
  let component: HexViewDetailsComponent;
  let fixture: ComponentFixture<HexViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HexViewDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
