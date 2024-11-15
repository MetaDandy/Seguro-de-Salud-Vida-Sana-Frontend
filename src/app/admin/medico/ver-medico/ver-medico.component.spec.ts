import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMedicoComponent } from './ver-medico.component';

describe('VerMedicoComponent', () => {
  let component: VerMedicoComponent;
  let fixture: ComponentFixture<VerMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
