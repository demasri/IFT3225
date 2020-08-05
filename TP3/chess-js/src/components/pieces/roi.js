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

export default class Roi extends Piece {
  constructor(color) {
    super(
      color,
      color === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
    );
  }

  isLegalMove(src, dest) {
    return (
      (src - 9 === dest && this.isSameDiagonal(src, dest)) ||
      src - 8 === dest ||
      (src - 7 === dest && this.isSameDiagonal(src, dest)) ||
      (src + 1 === dest && this.isSameRow(src, dest)) ||
      (src + 9 === dest && this.isSameDiagonal(src, dest)) ||
      src + 8 === dest ||
      (src + 7 === dest && this.isSameDiagonal(src, dest)) ||
      (src - 1 === dest && this.isSameRow(src, dest))
    );
  }

  getSrcToDestPath(src, dest) {
    return [];
  }
}
