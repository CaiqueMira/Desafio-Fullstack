import { TestBed } from '@angular/core/testing';

import { AutenticationInterceptor } from './autentication.interceptor';

describe('AutenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AutenticationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AutenticationInterceptor = TestBed.inject(AutenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
