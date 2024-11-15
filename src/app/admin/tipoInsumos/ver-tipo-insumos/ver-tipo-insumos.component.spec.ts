import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTipoInsumosComponent } from './ver-tipo-insumos.component';

describe('VerTipoInsumosComponent', () => {
  let component: VerTipoInsumosComponent;
  let fixture: ComponentFixture<VerTipoInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTipoInsumosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTipoInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
