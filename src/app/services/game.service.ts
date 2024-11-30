
import { Injectable } from '@angular/core';
import { Cell } from '../cell.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private boardSize = 10;
  private mineCount = 10;
  private board: Cell[][] = [];

  constructor() {
    this.initializeBoard();
  }

  initializeBoard() {
    // Crear tablero vacío
    this.board = Array(this.boardSize).fill(null).map((_, x) =>
      Array(this.boardSize).fill(null).map((_, y) => ({
        x,
        y,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0
      }))
    );

    // Generar minas aleatoriamente
    this.placeMines();

    // Calcular minas adyacentes
    this.calculateAdjacentMines();
  }

  placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < this.mineCount) {
      const x = Math.floor(Math.random() * this.boardSize);
      const y = Math.floor(Math.random() * this.boardSize);

      if (!this.board[x][y].isMine) {
        this.board[x][y].isMine = true;
        minesPlaced++;
      }
    }
  }

  calculateAdjacentMines() {
    for (let x = 0; x < this.boardSize; x++) {
      for (let y = 0; y < this.boardSize; y++) {
        if (!this.board[x][y].isMine) {
          this.board[x][y].adjacentMines = this.countAdjacentMines(x, y);
        }
      }
    }
  }

  countAdjacentMines(x: number, y: number): number {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 && newX < this.boardSize &&
          newY >= 0 && newY < this.boardSize &&
          this.board[newX][newY].isMine
        ) {
          count++;
        }
      }
    }
    return count;
  }

  revealCell(x: number, y: number): boolean {
    const cell = this.board[x][y];

    // Si ya está destapada, no hacer nada
    if (cell.isRevealed || cell.isFlagged) return false;

    cell.isRevealed = true;

    // Si es una mina, game over
    if (cell.isMine) {
      return true; // Game Over
    }

    // Si no hay minas adyacentes, revelar celdas cercanas
    if (cell.adjacentMines === 0) {
      this.revealAdjacentEmptyCells(x, y);
    }

    return false;
  }

  revealAdjacentEmptyCells(x: number, y: number) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 && newX < this.boardSize &&
          newY >= 0 && newY < this.boardSize &&
          !this.board[newX][newY].isRevealed
        ) {
          this.revealCell(newX, newY);
        }
      }
    }
  }

  getBoard(): Cell[][] {
    return this.board;
  }
}
