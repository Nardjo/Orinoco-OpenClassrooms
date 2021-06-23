(async () => {
  const productId = getProductId();
  const productData = await getProductData(productId);
  const urlApi = ""
  displayProduct(productData);
  btnAddBasket(productData);
})();

// récupération de l'id du produit
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}

// récupération du produit grâce à l'id
function getProductData(productId) {
  const url = "http://localhost:3000/api/cameras/"
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

// ajout du produit sur la page produit
function displayProduct(productData) {
  document.getElementById("imageEltProduct").src = productData.imageUrl;
  document.getElementById("titleEltProduct").textContent = productData.name;
  document.getElementById("priceEltProduct").textContent = `${
    productData.price / 100
  }.00 €`;
  document.getElementById("descriptionEltProduct").textContent =
    productData.description;

  // affiche le choix des lentilles
  for (let lenses of productData.lenses) {
    let option = document.createElement("option");
    option.textContent = lenses;
    document.getElementById("lenseElt").appendChild(option);
  }
}

//ajout des produits au panier
function btnAddBasket(productData) {
  document.getElementById("btnAddBasket").onclick = (event) => {
    event.preventDefault();
    window.location.reload();
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    let selectedLenses = document.getElementById("lenseElt").value;
    let selectedQuantity = document.getElementById("quantityElt").value;

    if (basketContent === null) {
      basketContent = [];
    }

    let productObj = new Product(
      productData.name,
      productData.price,
      selectedLenses,
      selectedQuantity
    );
    basketContent.push(productObj);
    let basketJsoned = JSON.stringify(basketContent);
    localStorage.setItem("basketContent", basketJsoned);
    console.log(JSON.parse(localStorage.getItem("basketContent")));
  };
}
