/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccessManagerService } from './access-manager.service';

describe('Service: AccessManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessManagerService]
    });
  });

  it('should ...', inject([AccessManagerService], (service: AccessManagerService) => {
    expect(service).toBeTruthy();
  }));
});
