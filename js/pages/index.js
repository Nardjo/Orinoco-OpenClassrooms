(async () => {
  const products = await getProducts();
  basketPreview();
  displayProductsIndex(products);
})();

//récupération des produits
function getProducts() {
  // call de l'API
  return fetch(url)
  .then((httpResponse) => httpResponse.json())
    .then((products) => products)
    .catch((error) => {
      alert(
        "La connexion au serveur n'a pas pu être effectué."
      )
    })
}

//affichage des produits
function displayProductsIndex(products) {

  products.forEach((product) => {
    //récupération du template html()
    const templateElement = document.getElementById("templateProduct");

    // clonage du template
    const cloneElement = document.importNode(templateElement.content, true);

    //ajout des produits
    cloneElement.getElementById("linkProduct").href = `produit.html?id=${product._id}`;
    cloneElement.getElementById("imageProduct").src = product.imageUrl;
    cloneElement.getElementById("titleProduct").textContent = product.name;
    cloneElement.getElementById("descriptionProduct").textContent =
      product.description;
    cloneElement.getElementById("priceProduct").textContent = `${
      product.price / 100
    }.00 €`;

    //affichage du template
    document.getElementById("listProducts").appendChild(cloneElement);
  });
}
