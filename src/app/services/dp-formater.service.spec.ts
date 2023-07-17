import { TestBed } from '@angular/core/testing';

import { DpFormaterService } from './dp-formater.service';

describe('DpFormaterService', () => {
  let service: DpFormaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpFormaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
