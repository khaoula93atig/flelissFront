import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarianVisitComponent } from './veterinarian-visit.component';

describe('VeterinarianVisitComponent', () => {
  let component: VeterinarianVisitComponent;
  let fixture: ComponentFixture<VeterinarianVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinarianVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinarianVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
