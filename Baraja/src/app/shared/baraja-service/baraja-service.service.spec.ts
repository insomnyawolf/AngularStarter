import { TestBed } from '@angular/core/testing';

import { BarajaServiceService } from './baraja-service.service';

describe('BarajaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarajaServiceService = TestBed.get(BarajaServiceService);
    expect(service).toBeTruthy();
  });
});
