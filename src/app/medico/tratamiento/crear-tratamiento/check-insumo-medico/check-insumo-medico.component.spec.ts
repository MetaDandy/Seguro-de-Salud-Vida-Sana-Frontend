import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInsumoMedicoComponent } from './check-insumo-medico.component';

describe('CheckInsumoMedicoComponent', () => {
  let component: CheckInsumoMedicoComponent;
  let fixture: ComponentFixture<CheckInsumoMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInsumoMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInsumoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
