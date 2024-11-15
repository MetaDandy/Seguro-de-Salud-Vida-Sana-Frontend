import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInsumoMedicoComponent } from './crear-insumo-medico.component';

describe('CrearInsumoMedicoComponent', () => {
  let component: CrearInsumoMedicoComponent;
  let fixture: ComponentFixture<CrearInsumoMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearInsumoMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearInsumoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
