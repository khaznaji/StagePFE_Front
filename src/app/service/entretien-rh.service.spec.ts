import { TestBed } from '@angular/core/testing';

import { EntretienRhService } from './entretien-rh.service';

describe('EntretienRhService', () => {
  let service: EntretienRhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntretienRhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
