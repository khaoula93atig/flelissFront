import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVetVisitComponent } from './list-vet-visit.component';

describe('ListVetVisitComponent', () => {
  let component: ListVetVisitComponent;
  let fixture: ComponentFixture<ListVetVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVetVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVetVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
