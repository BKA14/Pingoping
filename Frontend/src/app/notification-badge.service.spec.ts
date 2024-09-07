import { TestBed } from '@angular/core/testing';

import { NotificationBadgeService } from './notification-badge.service';

describe('NotificationBadgeService', () => {
  let service: NotificationBadgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBadgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
