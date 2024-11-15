import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEnfermeroComponent } from './crear-enfermero.component';

describe('CrearEnfermeroComponent', () => {
  let component: CrearEnfermeroComponent;
  let fixture: ComponentFixture<CrearEnfermeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEnfermeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEnfermeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
