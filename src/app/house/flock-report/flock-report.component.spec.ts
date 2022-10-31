import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlockReportComponent } from './flock-report.component';

describe('FlockReportComponent', () => {
  let component: FlockReportComponent;
  let fixture: ComponentFixture<FlockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
