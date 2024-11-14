import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoExamenComponent } from './crear-tipo-examen.component';

describe('CrearTipoExamenComponent', () => {
  let component: CrearTipoExamenComponent;
  let fixture: ComponentFixture<CrearTipoExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
