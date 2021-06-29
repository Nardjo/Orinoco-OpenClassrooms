(async () => {
  const productId = getProductId();
  const productData = await getProductData(productId);
  basketPreview();
  displayProduct(productData);
  btnAddBasket(productData);
})();

// récupération de l'id du produit
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}

// récupération du produit grâce à l'id
function getProductData(productId) {
  const url = "http://localhost:3000/api/cameras/";
  return fetch(url + `${productId}`)
    .then(function (jsonProduct) {
      return jsonProduct.json();
    })
    .then(function (product) {
      return product;
    })
    .catch(function (error) {
      alert(error);
    });
}

