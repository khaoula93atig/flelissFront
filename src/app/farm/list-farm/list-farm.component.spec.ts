import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFarmComponent } from './list-farm.component';

describe('ListFarmComponent', () => {
  let component: ListFarmComponent;
  let fixture: ComponentFixture<ListFarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
