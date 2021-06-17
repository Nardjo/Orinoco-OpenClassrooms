// récupération et affichage des produits

// function main autocall
(async function () {
  const products = await getProducts();
  addProduct(products)
})();

//récupération des produits
function getProducts() {
  return fetch("http://localhost:3000/api/teddies/")
    .then(function (jsonListProducts) {
      return jsonListProducts.json();
    })
    .then(function (products) {
      return products;
    })
    .catch(function (error) {
      alert(error);
    });
}

//boucle sur tous les produits et les affiche
function addProduct(products) {
  for (var product of products) {
    displayProducts(product)
  }

}
//affichage des produits
function displayProducts(product) {

  //récupération du template html
  const templateElt = document.getElementById("templateProduct");

  // clonage du template
  const cloneElt = document.importNode(templateElt.content, true);
 
  //ajout des produits
  cloneElt.getElementById("linkProduct").href = `/produit.html?id=${product.id}`
  cloneElt.getElementById("imageProduct").src = product.imageUrl
  cloneElt.getElementById("titleProduct").textContent = product.name
  cloneElt.getElementById("descriptionProduct").textContent = product.description
  cloneElt.getElementById("priceProduct").textContent = `${product.price /100}.00 €`

  //affichage du template
  document.getElementById("container").appendChild(cloneElt)
}
