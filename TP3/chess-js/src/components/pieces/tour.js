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

export default class Tour extends Piece {
  constructor(color) {
    super(
      color,
      color === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"
    );
  }

  isLegalMove(src, dest) {
    return this.isSameColumn(src, dest) || this.isSameRow(src, dest);
  }

  getSrcToDestPath(src, dest) {
    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}
