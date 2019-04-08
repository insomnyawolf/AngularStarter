import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarajaServiceService = TestBed.get(BarajaServiceService);
    expect(service).toBeTruthy();
  });
});
