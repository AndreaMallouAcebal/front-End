import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPatrocinadoresComponent } from './listar-patrocinadores.component';

describe('ListarPatrocinadoresComponent', () => {
  let component: ListarPatrocinadoresComponent;
  let fixture: ComponentFixture<ListarPatrocinadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPatrocinadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPatrocinadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
