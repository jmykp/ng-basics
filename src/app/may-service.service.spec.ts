import { TestBed } from '@angular/core/testing';

import { MayServiceService } from './may-service.service';

describe('MayServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MayServiceService = TestBed.get(MayServiceService);
    expect(service).toBeTruthy();
  });
});
