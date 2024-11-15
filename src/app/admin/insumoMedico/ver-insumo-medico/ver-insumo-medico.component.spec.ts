import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInsumoMedicoComponent } from './ver-insumo-medico.component';

describe('VerInsumoMedicoComponent', () => {
  let component: VerInsumoMedicoComponent;
  let fixture: ComponentFixture<VerInsumoMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerInsumoMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInsumoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
