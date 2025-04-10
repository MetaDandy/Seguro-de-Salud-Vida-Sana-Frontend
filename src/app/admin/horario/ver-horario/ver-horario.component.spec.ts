import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHorarioComponent } from './ver-horario.component';

describe('VerHorarioComponent', () => {
  let component: VerHorarioComponent;
  let fixture: ComponentFixture<VerHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
