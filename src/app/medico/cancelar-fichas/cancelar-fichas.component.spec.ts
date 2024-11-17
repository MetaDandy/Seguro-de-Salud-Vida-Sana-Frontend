import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarFichasComponent } from './cancelar-fichas.component';

describe('CancelarFichasComponent', () => {
  let component: CancelarFichasComponent;
  let fixture: ComponentFixture<CancelarFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarFichasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
