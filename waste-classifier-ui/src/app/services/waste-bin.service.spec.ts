import { TestBed } from '@angular/core/testing';

import { WasteBinService } from './waste-bin.service';

describe('WasteBinService', () => {
  let service: WasteBinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteBinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
