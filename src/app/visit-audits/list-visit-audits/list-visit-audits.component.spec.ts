import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitAuditsComponent } from './list-visit-audits.component';

describe('ListVisitAuditsComponent', () => {
  let component: ListVisitAuditsComponent;
  let fixture: ComponentFixture<ListVisitAuditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVisitAuditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVisitAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
