let basketContent = JSON.parse(localStorage.getItem("cameras")) || [];
// preview du panier dans la nav
function basketPreview() {
    if (basketContent.length == 0) {
    } else {
      let calculBasketPreview = 0;
      for (var product of basketContent) {
        calculBasketPreview += product.quantity;
      }
      document.getElementById("nombreProduct").textContent =
        "(" + `${calculBasketPreview}` + ")";
    }
}
basketPreview();
// add produits au paniers
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
     
  
        let selectedLenses = (document.getElementById("lenseElt").value);
        let selectedQuantity = parseInt(document.getElementById("quantityElt").value);
  
        if (basketContent === null) {
            basketContent = [];
        }
  
        let item = new Product(
            productData._id,
            productData.name,
            productData.price,
            selectedLenses,
            selectedQuantity
        );
  
        var isPresent = false;
        var indexModif;
        for (var basket of basketContent) {
            switch (basket.option) {
                case item.option:
                    isPresent = true;
                    indexModif = basketContent.indexOf(basket)
           
            }
        }
  
        if (isPresent) {
            basketContent[indexModif].quantity =
                +basketContent[indexModif].quantity + +item.quantity;
            localStorage.setItem("cameras", JSON.stringify(basketContent));
        } else {
            basketContent.push(item);
            localStorage.setItem("cameras", JSON.stringify(basketContent));
        }
      
    };
}