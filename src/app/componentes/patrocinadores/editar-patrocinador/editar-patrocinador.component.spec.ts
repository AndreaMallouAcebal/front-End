import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPatrocinadorComponent } from './editar-patrocinador.component';

describe('EditarPatrocinadorComponent', () => {
  let component: EditarPatrocinadorComponent;
  let fixture: ComponentFixture<EditarPatrocinadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPatrocinadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPatrocinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
