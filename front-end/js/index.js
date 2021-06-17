// récupération et affichage des produits

// function main autocall
(async () => {
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

  //récupération du template html()
  const templateElement = document.getElementById("templateProduct");

  // clonage du template
  const cloneElement = document.importNode(templateElement.content, true);
 
  //ajout des produits
  cloneElement.getElementById("linkProduct").href = `produit.html?id=${product._id}`
  cloneElement.getElementById("imageProduct").src = product.imageUrl
  cloneElement.getElementById("titleProduct").textContent = product.name
  cloneElement.getElementById("descriptionProduct").textContent = product.description
  cloneElement.getElementById("priceProduct").textContent = `${product.price /100}.00 €`

  //affichage du template
  document.getElementById("listProducts").appendChild(cloneElement)
}
