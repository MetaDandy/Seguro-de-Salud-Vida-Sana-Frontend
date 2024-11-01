import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-test-child',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './test-child.component.html',
  styleUrl: './test-child.component.css',
})
export class TestChildComponent implements OnInit {
  @Input() text: string;
  @Output() textChange = new EventEmitter<string>();

  constructor() {
    this.text = '';
  }

  ngOnInit(): void {
    console.log('se inicializo test-child');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('se cambio test-child');
  }

  handleClick() {
    this.text = 'test text changed by the child';
    this.textChange.emit(this.text);
  }
}
