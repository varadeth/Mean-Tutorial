import { TestBed } from '@angular/core/testing';

import { MattableService } from './mattable.service';

describe('MattableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MattableService = TestBed.get(MattableService);
    expect(service).toBeTruthy();
  });
});
