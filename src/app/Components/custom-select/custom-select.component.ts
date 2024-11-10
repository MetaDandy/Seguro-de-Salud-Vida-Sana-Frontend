import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  template: `<mat-form-field appearance="fill" class="w-full">
    <mat-label>{{ placeholder }}</mat-label>
    <mat-select
      [(ngModel)]="selectedValue"
      (selectionChange)="onSelectionChange()"
    >
      <mat-option *ngFor="let option of options" [value]="option.value">
        {{ option.label }}
      </mat-option>
    </mat-select>
  </mat-form-field> `,
})
export class CustomSelectComponent {
  @Input() options: { value: any; label: string }[] = [];
  @Input() placeholder: string = 'Seleccionar opción';
  @Output() selectionChange = new EventEmitter<any>();

  selectedValue: any;

  onSelectionChange() {
    this.selectionChange.emit(this.selectedValue);
  }
}
