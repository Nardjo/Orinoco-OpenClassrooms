(async () => {
  const productId = getProductId();
  const productData = await getProductData(productId);
  displayProduct(productData);
})();

// récupération de l'id du produit
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}

// récupération du produit grâce à l'id
function getProductData(productId) {
  return fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then(function (jsonProduct) {
      return jsonProduct.json();
    })
    .then(function (productData) {
      return productData;
    })
    .catch(function (error) {
      alert(error);
    });
}

// ajout du produit sur la page produit
function displayProduct(productData) {
  document.getElementById("imageEltProduct").src = productData.imageUrl;
  document.getElementById("titleEltProduct").textContent = productData.name;
  document.getElementById("priceEltProduct").textContent = `${productData.price / 100}.00 €`;
  document.getElementById("descriptionEltProduct").textContent = productData.description;

  // affiche le choix des lentilles
  for (i = 0; i < productData.lenses.length; i++) {
    let option = document.createElement("option");
    option.textContent = productData.lenses[i];
    document.getElementById("lenseElt").appendChild(option);
  }
}
