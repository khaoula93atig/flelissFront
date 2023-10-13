import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotalityVisitComponent } from './motality-visit.component';

describe('MotalityVisitComponent', () => {
  let component: MotalityVisitComponent;
  let fixture: ComponentFixture<MotalityVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotalityVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotalityVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
