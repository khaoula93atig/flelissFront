import { TestBed } from '@angular/core/testing';

import { VisitVeterinarianService } from './visit-veterinarian.service';

describe('VisitVeterinarianService', () => {
  let service: VisitVeterinarianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitVeterinarianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
