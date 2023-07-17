import { TestBed } from '@angular/core/testing';

import { SidebarDataShareService } from './sidebar-data-share.service';

describe('SidebarDataShareService', () => {
  let service: SidebarDataShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarDataShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
