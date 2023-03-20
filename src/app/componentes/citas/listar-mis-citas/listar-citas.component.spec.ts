import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMisCitasComponent } from './listar-mis-citas.component';

describe('ListarCitasComponent', () => {
  let component: ListarMisCitasComponent;
  let fixture: ComponentFixture<ListarMisCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMisCitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMisCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
