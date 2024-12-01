import { TestBed } from '@angular/core/testing';

import { CommonFuctionsService } from './common-fuctions.service';

describe('CommonFuctionsService', () => {
  let service: CommonFuctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonFuctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
