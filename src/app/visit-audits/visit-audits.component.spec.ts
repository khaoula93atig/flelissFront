import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAuditsComponent } from './visit-audits.component';

describe('VisitAuditsComponent', () => {
  let component: VisitAuditsComponent;
  let fixture: ComponentFixture<VisitAuditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitAuditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
