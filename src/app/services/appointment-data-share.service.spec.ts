import { TestBed } from '@angular/core/testing';

import { AppointmentDataShareService } from './appointment-data-share.service';

describe('AppointmentDataShareService', () => {
  let service: AppointmentDataShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentDataShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
