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

export default class Square extends React.Component {
  render() {
    return (
      <button
        id={this.props.value}
        className={this.props.shade + "_square"}
        // L'ajout de la balise style directement dans l'element html n'est peut-etre pas la meilleure facon de proceder mais celle-ci
        // est seulement utiliser pour changer le background de la case lorsqu'elle est selectionner donc il est plus simple de faire
        // la gestion comme ca que par le css...
        style={this.props.style}
        onClick={this.props.onClick}
      ></button>
    );
  }
}
