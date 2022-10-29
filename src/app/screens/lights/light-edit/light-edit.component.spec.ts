import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightEditComponent } from './light-edit.component';

describe('LightEditComponent', () => {
  let component: LightEditComponent;
  let fixture: ComponentFixture<LightEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
