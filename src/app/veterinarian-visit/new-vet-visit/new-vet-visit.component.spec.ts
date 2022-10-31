import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVetVisitComponent } from './new-vet-visit.component';

describe('NewVetVisitComponent', () => {
  let component: NewVetVisitComponent;
  let fixture: ComponentFixture<NewVetVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVetVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVetVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
