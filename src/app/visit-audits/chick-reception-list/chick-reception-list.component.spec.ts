import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickReceptionListComponent } from './chick-reception-list.component';

describe('ChickReceptionListComponent', () => {
  let component: ChickReceptionListComponent;
  let fixture: ComponentFixture<ChickReceptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChickReceptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChickReceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
