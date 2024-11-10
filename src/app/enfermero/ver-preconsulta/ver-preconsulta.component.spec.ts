import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPreconsultaComponent } from './ver-preconsulta.component';

describe('VerPreconsultaComponent', () => {
  let component: VerPreconsultaComponent;
  let fixture: ComponentFixture<VerPreconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPreconsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPreconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
