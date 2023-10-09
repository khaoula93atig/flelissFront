import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManagerAuditVistComponent } from './list-manager-audit-vist.component';

describe('ListManagerAuditVistComponent', () => {
  let component: ListManagerAuditVistComponent;
  let fixture: ComponentFixture<ListManagerAuditVistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListManagerAuditVistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManagerAuditVistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
