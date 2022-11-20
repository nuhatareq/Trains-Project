import { TestBed } from '@angular/core/testing';

import { AuthTrainCompositionService } from './auth-train-composition.service';

describe('AuthTrainCompositionService', () => {
  let service: AuthTrainCompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTrainCompositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
