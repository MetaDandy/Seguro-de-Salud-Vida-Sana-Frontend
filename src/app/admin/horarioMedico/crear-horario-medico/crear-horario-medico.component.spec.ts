import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHorarioMedicoComponent } from './crear-horario-medico.component';

describe('CrearHorarioMedicoComponent', () => {
  let component: CrearHorarioMedicoComponent;
  let fixture: ComponentFixture<CrearHorarioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearHorarioMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearHorarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
