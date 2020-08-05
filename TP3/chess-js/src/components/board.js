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

import React from "react";
import Square from "./square";
import Pion from "./pieces/pion";
import Chevalier from "./pieces/chevalier";
import Tour from "./pieces/tour";
import Fou from "./pieces/fou";
import Reine from "./pieces/reine";
import Roi from "./pieces/roi";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initialiseBoard(), // d'echec
      color: 1, // couleur du jouer actif
      pieceInitiale: -1, //piece selectionner a deplace
      status: "", // les messages d'erreurs et instructions
    };
  }

  renderSquare(i, shade) {
    return (
      <Square
        value={i}
        shade={shade}
        piece={this.state.board[i]}
        style={this.state.board[i] ? this.state.board[i].style : null}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  /***
   * Fonction qui contient la logique de gestion de chaque mouvement effectuer par les joueurs.
   */
  handleClick(i) {
    // "Note how in handleClick, we call .slice() to create a copy of the board array to modify instead of modifying the existing array."
    // ==> Conseil pris de la page tutorial de reactJS que j'utilise un peu partout (voir lien ci-dessus)
    const board = this.state.board.slice();

    if (this.isGameOver(board, this.state.color)) {
      this.setState({
        status:
          "Un roi est mort. Veuillez redemarrer la page pour debuter une autre partie...",
        pieceInitiale: i,
      });
    }

    // Si la piece initiale est -1, alors la case selectionner est la source du deplacement et non la destination
    if (this.state.pieceInitiale === -1) {
      // Verifie si la case selectionner est une piece et une piece de la bonne couleur.
      if (!board[i] || board[i].color !== this.state.color) {
        this.setState({
          status:
            "Mauvaise Selection... Veuillez choisir des pieces de couleur " +
            (this.state.color === 1 ? "blanche..." : "noire..."),
        });
        if (board[i]) {
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
          // ==> Un autre conseil que j'ai recu est d'utiliser la spread notation pour des objects (comme les miens) qui on beaucoup de props
          board[i].style = { ...board[i].style, backgroundColor: "" };
        }
      } else {
        // Selectionne la piece cliquer et change le background pour rendre le focus plus claire.
        board[i].style = {
          ...board[i].style,
          backgroundColor: "RGB(111,143,114)",
        };
        // Mets a jour la piece initiale pour catcher la destination au prochain click
        this.setState({
          status: "Veuillez selectionner la destination de votre piece...",
          pieceInitiale: i,
        });
      }
    }
    // Si piece initial > -1 alors le carre selectionner est un carre de destination et non source
    else if (this.state.pieceInitiale > -1) {
      // Verifie si une destination legale est selectionner
      board[this.state.pieceInitiale].style = {
        ...board[this.state.pieceInitiale].style,
        backgroundColor: "",
      };
      // Verifie si la destination selectionner est deja occuper par une piece de la meme couleur
      if (board[i] && board[i].color === this.state.color) {
        this.setState({
          status:
            "Mauvaise Selection... Veuillez choisir une case et une destination valide..",
          pieceInitiale: -1,
        });
      } else {
        const board = this.state.board.slice();

        const isDestEnemyOccupied = board[i] ? true : false;
        const isLegalMove = board[this.state.pieceInitiale].isLegalMove(
          this.state.pieceInitiale,
          i,
          isDestEnemyOccupied
        );
        const srcToDestPath = board[this.state.pieceInitiale].getSrcToDestPath(
          this.state.pieceInitiale,
          i
        );
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if (isLegalMove && isMoveLegal) {
          var kingPieceIndex = this.getIndexOfPlayersKing(
            board,
            this.state.color
          );

          if (
            this.isKingChecked(board, this.state.color, kingPieceIndex) &&
            this.isKingChecked(board, this.state.color, i)
          ) {
            this.moveWillSaveKing(
              board,
              this.state.color,
              i,
              board[this.state.pieceInitiale]
            );
            this.setState({
              status: "Mauvaise Selection... Votre roi est en échec.",
              pieceInitiale: -1,
            });
          } else {
            board[i] = board[this.state.pieceInitiale];
            board[this.state.pieceInitiale] = null;
            let color = this.state.color === 1 ? 2 : 1;
            this.setState({
              pieceInitiale: -1,
              board: board,
              color: color,
              status: "",
            });
          }
        } else {
          this.setState({
            status:
              "Mauvaise Selection...Veuillez choisir une case et une destination valide...",
            pieceInitiale: -1,
          });
        }
      }
    }
  }

  isMoveLegal(srcToDestPath) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.board[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }

  // Function that finds and returns the active players king position on the board
  getIndexOfPlayersKing(board, player) {
    var kings = {};
    for (var i = 0; i < board.length; i++) {
      if (board[i] instanceof Roi) {
        kings[i] = board[i];
      }
    }
    var index = Object.keys(kings).map(function (key) {
      if (kings[key].color === player) {
        return key;
      }
    });
    return index.find((e) => e !== undefined);
  }

  isGameOver(board, player) {
    var kings = {};
    for (var i = 0; i < board.length; i++) {
      if (board[i] instanceof Roi) {
        kings[i] = board[i];
      }
    }
    var index = Object.keys(kings).map(function (key) {
      if (kings[key].color === player) {
        return key;
      }
    });

    return index.length === 1 ? true : false;
  }

  // Function that finds and returns the elements of the index's row with their respective indexes
  getSameRowElements(board, index) {
    var offset = index % 8;
    var minIndex = index - offset;
    var maxIndex = +index + (8 - offset);
    var elements = {};

    for (var i = minIndex; i < maxIndex; i++) {
      elements[i] = board[i];
    }

    return elements;
  }

  // Function that finds and returns the elements of the index's column with their respective indexes
  getSameColElements(board, index) {
    var row = Math.floor(index / 8);
    var column = {};
    var idx = +index;

    for (var i = 0; i < row; i++) {
      idx = +idx - 8;
      column[idx] = board[idx];
    }

    column[+index] = board[+index];
    idx = +index;

    for (var j = row; j < 7; j++) {
      idx = +idx + 8;
      column[idx] = board[idx];
    }

    return column;
  }

  // Function that finds and returns the elements of the index's diagonal with their respective indexes
  getSameDiagElements(board, index) {
    // TODO...
  }

  // Function that lists surrounding board that can pose threat to King
  getThreatningBoard(board, index, player) {
    // Get all elements surronding index square
    var rowItems = this.getSameRowElements(board, index);
    var colItems = this.getSameColElements(board, index);

    // Filters pieces of same color as they arent a threat
    var enemyItems = {};

    // row items
    Object.keys(rowItems).forEach((key) => {
      if (rowItems[key] && rowItems[key].color !== player) {
        enemyItems[key] = rowItems[key];
      }
    });

    // column items
    Object.keys(colItems).forEach((key) => {
      if (colItems[key] && colItems[key].color !== player) {
        enemyItems[key] = colItems[key];
      }
    });

    return enemyItems;
  }

  // Function that returns true if active player's king is checked on a specific board
  isKingChecked(board, player, kingIndex) {
    // for each enemy, determine if that piece is a threat.
    for (var i = 0; i < board.length; i++) {
      if (board[i] && board[i].color !== player) {
        if (
          board[i].isLegalMove(i, kingIndex, true) &&
          this.isMoveLegal(board[i].getSrcToDestPath(i, kingIndex))
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Function that determines wether a move will save the active player's king (will return True if yes)
  moveWillSaveKing(board, player, dest, piece) {
    var chessBoard = board.slice();

    chessBoard[dest] = piece;

    var kingIndex = this.getIndexOfPlayersKing(chessBoard, player);

    console.log(!this.isKingChecked(chessBoard, player, kingIndex));
  }

  isEven(num) {
    return num % 2 === 0;
  }

  initialiseBoard() {
    const board = Array(64).fill(null);

    // Pions
    board[8] = new Pion(2);
    board[9] = new Pion(2);
    board[10] = new Pion(2);
    board[11] = new Pion(2);
    board[12] = new Pion(2);
    board[13] = new Pion(2);
    board[14] = new Pion(2);
    board[15] = new Pion(2);
    board[48] = new Pion(1);
    board[49] = new Pion(1);
    board[50] = new Pion(1);
    board[51] = new Pion(1);
    board[52] = new Pion(1);
    board[53] = new Pion(1);
    board[54] = new Pion(1);
    board[55] = new Pion(1);
    board[56] = new Pion(1);

    // Tours
    board[0] = new Tour(2);
    board[7] = new Tour(2);
    board[56] = new Tour(1);
    board[63] = new Tour(1);

    // Chevaliers
    board[1] = new Chevalier(2);
    board[6] = new Chevalier(2);
    board[57] = new Chevalier(1);
    board[62] = new Chevalier(1);

    // Fou
    board[2] = new Fou(2);
    board[5] = new Fou(2);
    board[58] = new Fou(1);
    board[61] = new Fou(1);

    // Reine
    board[3] = new Reine(2);
    board[59] = new Reine(1);

    // Roi
    board[4] = new Roi(2);
    board[60] = new Roi(1);

    return board;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, "dark")}
          {this.renderSquare(1, "light")}
          {this.renderSquare(2, "dark")}
          {this.renderSquare(3, "light")}
          {this.renderSquare(4, "dark")}
          {this.renderSquare(5, "light")}
          {this.renderSquare(6, "dark")}
          {this.renderSquare(7, "light")}
        </div>
        <div className="board-row">
          {this.renderSquare(8, "light")}
          {this.renderSquare(9, "dark")}
          {this.renderSquare(10, "light")}
          {this.renderSquare(11, "dark")}
          {this.renderSquare(12, "light")}
          {this.renderSquare(13, "dark")}
          {this.renderSquare(14, "light")}
          {this.renderSquare(15, "dark")}
        </div>
        <div className="board-row">
          {this.renderSquare(16, "dark")}
          {this.renderSquare(17, "light")}
          {this.renderSquare(18, "dark")}
          {this.renderSquare(19, "light")}
          {this.renderSquare(20, "dark")}
          {this.renderSquare(21, "light")}
          {this.renderSquare(22, "dark")}
          {this.renderSquare(23, "light")}
        </div>
        <div className="board-row">
          {this.renderSquare(24, "light")}
          {this.renderSquare(25, "dark")}
          {this.renderSquare(26, "light")}
          {this.renderSquare(27, "dark")}
          {this.renderSquare(28, "light")}
          {this.renderSquare(29, "dark")}
          {this.renderSquare(30, "light")}
          {this.renderSquare(31, "dark")}
        </div>
        <div className="board-row">
          {this.renderSquare(32, "dark")}
          {this.renderSquare(33, "light")}
          {this.renderSquare(34, "dark")}
          {this.renderSquare(35, "light")}
          {this.renderSquare(36, "dark")}
          {this.renderSquare(37, "light")}
          {this.renderSquare(38, "dark")}
          {this.renderSquare(39, "light")}
        </div>
        <div className="board-row">
          {this.renderSquare(40, "light")}
          {this.renderSquare(41, "dark")}
          {this.renderSquare(42, "light")}
          {this.renderSquare(43, "dark")}
          {this.renderSquare(44, "light")}
          {this.renderSquare(45, "dark")}
          {this.renderSquare(46, "light")}
          {this.renderSquare(47, "dark")}
        </div>
        <div className="board-row">
          {this.renderSquare(48, "dark")}
          {this.renderSquare(49, "light")}
          {this.renderSquare(50, "dark")}
          {this.renderSquare(51, "light")}
          {this.renderSquare(52, "dark")}
          {this.renderSquare(53, "light")}
          {this.renderSquare(54, "dark")}
          {this.renderSquare(55, "light")}
        </div>
        <div className="board-row">
          {this.renderSquare(56, "light")}
          {this.renderSquare(57, "dark")}
          {this.renderSquare(58, "light")}
          {this.renderSquare(59, "dark")}
          {this.renderSquare(60, "light")}
          {this.renderSquare(61, "dark")}
          {this.renderSquare(62, "light")}
          {this.renderSquare(63, "dark")}
        </div>
        <div className="status">{this.state.status}</div>
      </div>
    );
  }
}
