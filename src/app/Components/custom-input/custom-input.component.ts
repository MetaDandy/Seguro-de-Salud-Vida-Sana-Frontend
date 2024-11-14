import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomInputConfig } from './custom-input.config';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="">
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>{{ config.label }}</mat-label>
        <input
          matInput
          [type]="config.type"
          [formControl]="control"
          [placeholder]="config.placeholder || ''"
          [attr.aria-label]="config.label"
        />
      </mat-form-field>
      @if (control && control.invalid && control.touched) {
      <mat-error>
        {{ getErrorMessage() }}
      </mat-error>
      }
    </div>
  `,
})
export class CustomInputComponent {
  @Input() config!: CustomInputConfig;
  @Input() control!: FormControl;

  @Input() formControlAccessor?: boolean;

  getErrorMessage(): string | null {
    if (!this.control || !this.config.errorMessages) return null;

    for (const errorKey of Object.keys(this.config.errorMessages)) {
      if (this.control.hasError(errorKey))
        return this.config.errorMessages[errorKey];
    }
    return null;
  }
}
