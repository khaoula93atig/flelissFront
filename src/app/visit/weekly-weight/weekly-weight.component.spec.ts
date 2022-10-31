import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyWeightComponent } from './weekly-weight.component';

describe('WeeklyWeightComponent', () => {
  let component: WeeklyWeightComponent;
  let fixture: ComponentFixture<WeeklyWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
