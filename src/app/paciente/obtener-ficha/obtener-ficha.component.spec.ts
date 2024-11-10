import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerFichaComponent } from './obtener-ficha.component';

describe('ObtenerFichaComponent', () => {
  let component: ObtenerFichaComponent;
  let fixture: ComponentFixture<ObtenerFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtenerFichaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
