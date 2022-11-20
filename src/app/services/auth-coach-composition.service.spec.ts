import { TestBed } from '@angular/core/testing';

import { AuthCoachCompositionService } from './auth-coach-composition.service';

describe('AuthCoachCompositionService', () => {
  let service: AuthCoachCompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCoachCompositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
