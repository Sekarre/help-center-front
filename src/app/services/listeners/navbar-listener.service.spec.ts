import { TestBed } from '@angular/core/testing';

import { NavbarListenerService } from './navbar-listener.service';

describe('NavbarListenerService', () => {
  let service: NavbarListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
