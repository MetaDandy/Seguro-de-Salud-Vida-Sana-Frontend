import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button
      mat-raised-button
      color="primary"
      type="submit"
      class="w-full py-2"
      [disabled]="disabled"
    >
      {{ label }}
    </button>
  `,
})
export class SubmitButtonComponent {
  @Input() label!: string;
  @Input() disabled!: boolean;
}
