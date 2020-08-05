/***
 * Auteur : Daniel El-Masri
 * Date : 29 Juillet 2020
 * IFT3225 - TP3 : Exercice 1
 *
 * Les ressources utilisee pour coder sont specifier ci-dessous:
 *
 * - https://reactjs.org/tutorial/tutorial.html#what-are-we-building
 * - https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/
 *
 */

import Piece from "./piece";

export default class Pion extends Piece {
  constructor(color) {
    super(
      color,
      color === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
    );
    this.initialPositions =
      color === 1
        ? [48, 49, 50, 51, 52, 53, 54, 55]
        : [8, 9, 10, 11, 12, 13, 14, 15];
  }

  isLegalMove(src, dest, isDestEnemy) {
    if (this.color === 1) {
      if (
        (dest === src - 8 && !isDestEnemy) ||
        (dest === src - 16 && this.initialPositions.indexOf(src) !== -1)
      ) {
        return true;
      } else if (isDestEnemy && (dest === src - 9 || dest === src - 7)) {
        return true;
      }
    } else if (this.color === 2) {
      if (
        (dest === src + 8 && !isDestEnemy) ||
        (dest === src + 16 && this.initialPositions.indexOf(src) !== -1)
      ) {
        return true;
      } else if (isDestEnemy && (dest === src + 9 || dest === src + 7)) {
        return true;
      }
    }
    return false;
  }

  getSrcToDestPath(src, dest) {
    if (dest === src - 16) {
      return [src - 8];
    } else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  }
}
