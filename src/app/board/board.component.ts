import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game.service';
import {Cell} from '../cell.model';

@Component({
  selector: 'app-board',
  standalone: false,

  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  board: Cell[][] = [];
  gameOver = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.board = this.gameService.getBoard();
  }

  onCellClick(coords: {x: number, y: number}) {
    if (this.gameOver) return;

    const isGameOver = this.gameService.revealCell(coords.x, coords.y);

    if (isGameOver) {
      this.gameOver = true;
    }

    this.board = this.gameService.getBoard();
  }

  onRightClick(coords: {x: number, y: number}) {
    // Implementación de bandera (opcional)
    const cell = this.board[coords.x][coords.y];
    cell.isFlagged = !cell.isFlagged;
  }

  restartGame() {
    this.gameOver = false;
    this.gameService.initializeBoard();
    this.board = this.gameService.getBoard();
  }
}
