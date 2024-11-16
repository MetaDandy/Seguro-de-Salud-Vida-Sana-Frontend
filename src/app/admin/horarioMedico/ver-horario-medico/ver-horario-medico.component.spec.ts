import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHorarioMedicoComponent } from './ver-horario-medico.component';

describe('VerHorarioMedicoComponent', () => {
  let component: VerHorarioMedicoComponent;
  let fixture: ComponentFixture<VerHorarioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerHorarioMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerHorarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
