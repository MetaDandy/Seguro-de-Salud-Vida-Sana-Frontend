import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAnalisisSelectorComponent } from './tipo-analisis-selector.component';

describe('TipoAnalisisSelectorComponent', () => {
  let component: TipoAnalisisSelectorComponent;
  let fixture: ComponentFixture<TipoAnalisisSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoAnalisisSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAnalisisSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
