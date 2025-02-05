import { TestBed } from '@angular/core/testing';

import { RealtimeCrudService } from './realtime-crud.service';

describe('RealtimeCrudService', () => {
  let service: RealtimeCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
