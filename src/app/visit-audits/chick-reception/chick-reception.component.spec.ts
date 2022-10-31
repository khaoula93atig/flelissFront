import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickReceptionComponent } from './chick-reception.component';

describe('ChickReceptionComponent', () => {
  let component: ChickReceptionComponent;
  let fixture: ComponentFixture<ChickReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChickReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChickReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
