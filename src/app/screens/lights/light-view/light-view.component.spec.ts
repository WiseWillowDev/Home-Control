import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightViewComponent } from './light-view.component';

describe('LightViewComponent', () => {
  let component: LightViewComponent;
  let fixture: ComponentFixture<LightViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
