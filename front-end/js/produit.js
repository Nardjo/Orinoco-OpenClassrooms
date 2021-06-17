(async () => {
  const productId = getProductId()
  const productData = await getProductData(productId)
  addProduct(productData)
})()

// récupération de l'id du produit
function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}

// récupération du produit grâce à l'id
function getProductData(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
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
function addProduct(productData) {
  document.getElementById('imageEltProduct').src = productData.imageUrl
  document.getElementById('titleEltProduct').textContent = productData.name
  document.getElementById('priceEltProduct').textContent = `${productData.price / 100}.00 €`
  document.getElementById('descriptionEltProduct').textContent = productData.description
}
