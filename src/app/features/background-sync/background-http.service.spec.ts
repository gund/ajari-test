/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackgroundHttpService } from './background-http.service';

describe('Service: BackgroundHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundHttpService]
    });
  });

  it('should ...', inject([BackgroundHttpService], (service: BackgroundHttpService) => {
    expect(service).toBeTruthy();
  }));
});
