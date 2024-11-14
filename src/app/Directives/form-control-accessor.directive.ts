import { Directive, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormControlAccessor]',
  standalone: true,
})
export class FormControlAccessorDirective {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  get control(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }
}
