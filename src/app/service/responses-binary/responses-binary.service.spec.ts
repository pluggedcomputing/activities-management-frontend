import { TestBed } from '@angular/core/testing';

import { ResponsesBinaryService } from './responses-binary.service';

describe('ResponsesBinaryService', () => {
  let service: ResponsesBinaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsesBinaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
