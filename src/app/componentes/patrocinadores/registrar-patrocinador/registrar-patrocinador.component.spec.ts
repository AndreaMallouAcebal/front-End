import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPatrocinadorComponent } from './registrar-patrocinador.component';

describe('RegistrarPatrocinadorComponent', () => {
  let component: RegistrarPatrocinadorComponent;
  let fixture: ComponentFixture<RegistrarPatrocinadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPatrocinadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPatrocinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
