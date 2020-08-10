// Auteur : Daniel El-Masri (20096261)
// Date : 9 Aout 2020
// IFT3225 - Travail Pratique 4
// Objectif : Gestion du javascript des pages webs, pour la gestion des appels a l'api Flask pour l'envoie
//            de la requete de recherche et la presentation des documents resultant retourner par l'api.
// Resources :
//            1 - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//            2 - https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
//            3 - https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
//            4 - https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript

var relevant_document_list = [];

window.onload = function () {
  var search_engine_button = document.getElementById("search-engine-button");
  var search_query = document.getElementById("input-search-query");
  var document_list = document.getElementById("document-list");

  search_query.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      getDocumentList();
    }
  });

  search_engine_button.addEventListener("click", () => {
    getDocumentList();
  });

  function getDocumentList() {
    var query = { requete: search_query.value };

    console.log(JSON.stringify(query));

    postData("http://127.0.0.1:5000/api/send_query_request", query).then(
      (res) => {
        console.log(res);
        var fr = new FileReader();

        fr.onload = function () {
          tmp = JSON.parse(this.result);
          relevant_document_list = tmp["documents"];

          loadDocumentList();
        };

        fr.readAsText(res);
      }
    );
  }

  function loadDocumentList() {
    document_list.innerHTML = "";

    for (var i = 0; i < relevant_document_list.length; i++) {
      document_list.insertAdjacentHTML(
        "afterbegin",
        '<li class="list-group-item"><a href="' +
          relevant_document_list[i] +
          '">' +
          relevant_document_list[i].substring(
            16,
            relevant_document_list[i].length
          ) +
          "</a></li>"
      );
    }

    if (relevant_document_list.length == 0) {
      document_list.insertAdjacentHTML(
        "afterbegin",
        '<p class="no-result">Aucun resultat trouvé...</p>'
      );
    }
  }

  /***
   * ===============================================================================
   *                                 Private Methods
   * ===============================================================================
   */

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.blob();
  }
};
