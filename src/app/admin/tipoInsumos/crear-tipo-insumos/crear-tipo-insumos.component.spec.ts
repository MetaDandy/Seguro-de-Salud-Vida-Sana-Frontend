import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoInsumosComponent } from './crear-tipo-insumos.component';

describe('CrearTipoInsumosComponent', () => {
  let component: CrearTipoInsumosComponent;
  let fixture: ComponentFixture<CrearTipoInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoInsumosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
