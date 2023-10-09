import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBroodingCheckListComponent } from './list-brooding-check-list.component';

describe('ListBroodingCheckListComponent', () => {
  let component: ListBroodingCheckListComponent;
  let fixture: ComponentFixture<ListBroodingCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBroodingCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBroodingCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
