/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LancheService } from './lanche.service';

describe('Service: Lanche', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LancheService]
    });
  });

  it('should ...', inject([LancheService], (service: LancheService) => {
    expect(service).toBeTruthy();
  }));
});
