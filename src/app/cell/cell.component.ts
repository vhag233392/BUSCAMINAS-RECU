import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Cell} from '../cell.model';

@Component({
  selector: 'app-cell',
  standalone: false,

  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {

  @Input() cell!: Cell;
  @Output() cellClick = new EventEmitter<{x: number, y: number}>();
  @Output() cellRightClick = new EventEmitter<{x: number, y: number}>();

  onCellClick() {
    this.cellClick.emit({ x: this.cell.x, y: this.cell.y });
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.cellRightClick.emit({ x: this.cell.x, y: this.cell.y });
  }
}
