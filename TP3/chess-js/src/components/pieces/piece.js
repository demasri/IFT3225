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

export default class Piece {
  constructor(color, iconUrl) {
    this.color = color;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
  }

  // Les fonctions ci-dessous sont des fonctions utiliser par plusieurs piece donc vaut mieux les centralisee
  isSameRow(src, dest) {
    return dest >= src - (src % 8) && dest < src + (8 - (src % 8));
  }

  isSameColumn(src, dest) {
    return Math.abs(src - dest) % 8 === 0;
  }

  isSameDiagonal(src, dest) {
    return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0;
  }
}
