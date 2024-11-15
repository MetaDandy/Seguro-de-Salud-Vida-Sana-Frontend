import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEnfermeroComponent } from './ver-enfermero.component';

describe('VerEnfermeroComponent', () => {
  let component: VerEnfermeroComponent;
  let fixture: ComponentFixture<VerEnfermeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerEnfermeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerEnfermeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
