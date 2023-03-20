import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAnimalComponent } from './detalles-animal.component';

describe('DetallesAnimalComponent', () => {
  let component: DetallesAnimalComponent;
  let fixture: ComponentFixture<DetallesAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
