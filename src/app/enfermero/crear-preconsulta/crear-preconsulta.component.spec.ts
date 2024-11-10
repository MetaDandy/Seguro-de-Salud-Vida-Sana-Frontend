import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPreconsultaComponent } from './crear-preconsulta.component';

describe('CrearPreconsultaComponent', () => {
  let component: CrearPreconsultaComponent;
  let fixture: ComponentFixture<CrearPreconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPreconsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPreconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
