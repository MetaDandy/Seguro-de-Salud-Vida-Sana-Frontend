import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TestChildComponent } from '../test-child/test-child.component';

@Component({
  selector: 'app-test',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TestChildComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  text: string = 'hola mundo';

  /* constructor(cd: ChangeDetectorRef) {
    setTimeout(() => {
      this.text = 'test text changed';
      cd.detectChanges();
    }, 5000);
  } */

  handleClick() {
    this.text = 'alo mundo';
  }
}
