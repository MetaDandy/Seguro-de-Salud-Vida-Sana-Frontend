import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTipoAnalisisComponent } from './ver-tipo-analisis.component';

describe('VerTipoAnalisisComponent', () => {
  let component: VerTipoAnalisisComponent;
  let fixture: ComponentFixture<VerTipoAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTipoAnalisisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTipoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
