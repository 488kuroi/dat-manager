import { TestBed, inject } from '@angular/core/testing';

import { DatParserService } from './dat-parser.service';

describe('DatParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatParserService]
    });
  });

  it('should be created', inject([DatParserService], (service: DatParserService) => {
    expect(service).toBeTruthy();
  }));
});
