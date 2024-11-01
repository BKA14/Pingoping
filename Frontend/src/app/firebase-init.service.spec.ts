import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase-init.service';

describe('FirebaseInitService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
