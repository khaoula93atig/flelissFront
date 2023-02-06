import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlocksComponent } from './flocks.component';

describe('FlocksComponent', () => {
  let component: FlocksComponent;
  let fixture: ComponentFixture<FlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
