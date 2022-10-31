import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyFeedComponent } from './weekly-feed.component';

describe('WeeklyFeedComponent', () => {
  let component: WeeklyFeedComponent;
  let fixture: ComponentFixture<WeeklyFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
