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

export default class Chevalier extends Piece {
  constructor(color) {
    super(
      color,
      color === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
    );
  }

  isLegalMove(src, dest) {
    return (
      (src - 17 === dest && !this.isSameRow(src, dest)) ||
      (src - 10 === dest && !this.isSameRow(src, dest)) ||
      (src + 6 === dest && !this.isSameRow(src, dest)) ||
      (src + 15 === dest && !this.isSameRow(src, dest)) ||
      (src - 15 === dest && !this.isSameRow(src, dest)) ||
      (src - 6 === dest && !this.isSameRow(src, dest)) ||
      (src + 10 === dest && !this.isSameRow(src, dest)) ||
      (src + 17 === dest && !this.isSameRow(src, dest))
    );
  }

  /**
   * always returns empty array because of jumping
   * @return {[]}
   */
  getSrcToDestPath() {
    return [];
  }
}
