import { TestBed } from '@angular/core/testing';

import { LoginServiceReadyService } from './login-service-ready.service';

describe('LoginServiceReadyService', () => {
  let service: LoginServiceReadyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServiceReadyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
