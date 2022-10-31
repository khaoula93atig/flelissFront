import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroodingCheckListComponent } from './brooding-check-list.component';

describe('BroodingCheckListComponent', () => {
  let component: BroodingCheckListComponent;
  let fixture: ComponentFixture<BroodingCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroodingCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroodingCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
