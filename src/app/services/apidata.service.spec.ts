import { TestBed, inject } from '@angular/core/testing';

import { ApidataService } from './apidata.service';

describe('ApidataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApidataService]
    });
  });

  it('should be created', inject([ApidataService], (service: ApidataService) => {
    expect(service).toBeTruthy();
  }));
});
