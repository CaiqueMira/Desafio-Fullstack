import { TestBed } from '@angular/core/testing';

import { ExistingVinService } from './existing-vin.service';

describe('ExistingVinService', () => {
  let service: ExistingVinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistingVinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
