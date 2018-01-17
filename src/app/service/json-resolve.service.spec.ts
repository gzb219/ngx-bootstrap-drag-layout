import { TestBed, inject } from '@angular/core/testing';

import { JsonResolveService } from './json-resolve.service';

describe('JsonResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonResolveService]
    });
  });

  it('should be created', inject([JsonResolveService], (service: JsonResolveService) => {
    expect(service).toBeTruthy();
  }));
});
