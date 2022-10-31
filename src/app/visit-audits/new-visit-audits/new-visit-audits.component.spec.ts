import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVisitAuditsComponent } from './new-visit-audits.component';

describe('NewVisitAuditsComponent', () => {
  let component: NewVisitAuditsComponent;
  let fixture: ComponentFixture<NewVisitAuditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVisitAuditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVisitAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
