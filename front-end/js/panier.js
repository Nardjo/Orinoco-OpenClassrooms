let basketContent = JSON.parse(localStorage.getItem("basketContent"));
let total = 0;


document.getElementById("nombreProduct").textContent ="(" + basketContent.length + ")"

//suppression du panier
function suppressionArticle() {
  localStorage.clear();
  window.location.reload();
}

// écoute de l'event clique sur le bouton delete
document.getElementById("deleteBasket").onclick = (event) => {
  event.preventDefault();
  suppressionArticle();
};

// affichage du panier dans le tableau
basketContent.forEach((product) => {
  //récupération du template html
  const templateElement = document.getElementById("productTemplate");

  // clonage du template
  const cloneElement = document.importNode(templateElement.content, true);

  //ajout des produits
  cloneElement.getElementById("productName").textContent = product.name;
  cloneElement.getElementById("productLenses").textContent = product.option;
  cloneElement.getElementById("productQuantity").textContent = product.quantity;
  cloneElement.getElementById("productPrice").textContent = `${
    product.price / 100
  }.00 €`;

  //affichage du template
  document.getElementById("productsList").appendChild(cloneElement);

  document.getElementById("productTotalPrice").textContent = `${(total +=
      product.price / 100)}.00€`;
});


