import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfarmComponent } from './newfarm.component';

describe('NewfarmeComponent', () => {
  let component: NewfarmComponent;
  let fixture: ComponentFixture<NewfarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
