import { TestBed } from '@angular/core/testing';

import { VisitAuditsService } from './visit-audits.service';

describe('VisitAuditsService', () => {
  let service: VisitAuditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitAuditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
