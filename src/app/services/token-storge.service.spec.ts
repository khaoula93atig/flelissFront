import { TestBed } from '@angular/core/testing';

import { TokenStorgeService } from './token-storge.service';

describe('TokenStorgeService', () => {
  let service: TokenStorgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
