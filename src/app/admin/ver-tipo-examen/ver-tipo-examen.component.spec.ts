import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTipoExamenComponent } from './ver-tipo-examen.component';

describe('VerTipoExamenComponent', () => {
  let component: VerTipoExamenComponent;
  let fixture: ComponentFixture<VerTipoExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTipoExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTipoExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
