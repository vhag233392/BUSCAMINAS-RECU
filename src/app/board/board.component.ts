import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game.service';
import {Cell} from '../cell.model';

@Component({
  selector: 'app-board',
  standalone: false,

  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {

  board: Cell[][] = [];
  gameOver = false;
  boardSize: number;
  mineCount: number;

  constructor(private gameService: GameService) {
    this.boardSize = gameService.getBoardSize();
    this.mineCount = gameService.getMineCount();
  }

  ngOnInit() {
    this.board = this.gameService.getBoard();
  }

  startNewGame() {
    // Iniciar nuevo juego con los parámetros seleccionados
    this.gameOver = false;
    this.gameService.initializeBoard(this.boardSize, this.mineCount);
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
    this.startNewGame();
  }
}
