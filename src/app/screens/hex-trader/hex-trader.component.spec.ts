import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexTraderComponent } from './hex-trader.component';

describe('HexTraderComponent', () => {
  let component: HexTraderComponent;
  let fixture: ComponentFixture<HexTraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HexTraderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
