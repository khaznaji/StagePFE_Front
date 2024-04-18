import { TestBed } from '@angular/core/testing';

import { ParticapationFormationService } from './particapation-formation.service';

describe('ParticapationFormationService', () => {
  let service: ParticapationFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticapationFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
