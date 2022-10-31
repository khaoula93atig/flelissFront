import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAuditVisitComponent } from './manager-audit-visit.component';

describe('ManagerAuditVisitComponent', () => {
  let component: ManagerAuditVisitComponent;
  let fixture: ComponentFixture<ManagerAuditVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAuditVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAuditVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
