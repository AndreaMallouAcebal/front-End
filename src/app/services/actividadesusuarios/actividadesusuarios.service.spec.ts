import { TestBed } from '@angular/core/testing';

import { ActividadesusuariosService } from './actividadesusuarios.service';

describe('ActividadesusuariosService', () => {
  let service: ActividadesusuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadesusuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
