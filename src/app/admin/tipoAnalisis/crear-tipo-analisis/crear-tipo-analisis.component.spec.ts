import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoAnalisisComponent } from './crear-tipo-analisis.component';

describe('CrearTipoAnalisisComponent', () => {
  let component: CrearTipoAnalisisComponent;
  let fixture: ComponentFixture<CrearTipoAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoAnalisisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
