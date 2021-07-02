//appel de la fonction basketPreview
basketPreview();

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
    (product.quantity * product.price) / 100
  }.00 €`;

  //affichage du template
  document.getElementById("productsList").appendChild(cloneElement);

  //initialisation de total
  let total = 0;
  //calcul et affichage du total
  document.getElementById("productTotalPrice").textContent = `${(total +=
    product.price / 100)}.00€`;
});

// supprimer un produit
let btnDeleteElt = document.querySelectorAll(".btnDeleteElt");

for (let i = 0; i < btnDeleteElt.length; i++) {
  btnDeleteElt[i].onclick = (event) => {
    event.preventDefault();
    basketContent.splice(i, 1);
    localStorage.setItem("cameras", JSON.stringify(basketContent));
    window.location.reload();
  };
}

// ////////////////////////// Validation du formulaire et envoie en POST //////////////////////////

const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity =/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

document.getElementById("confirmPurchase").onclick = (event) => {
  event.preventDefault();
  // on prépare les infos pour l'envoie en POST
  var contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  // on valide que le formulaire soit correctement rempli
  if (
    (regexMail.test(contact.email) == true) &
    (regexName.test(contact.firstName) == true) &
    (regexName.test(contact.lastName) == true) &
    (regexCity.test(contact.city) == true) &
    (regexAddress.test(contact.address) == true)
  ) {
    localStorage.clear();
    var products = [];
    for (let listId of basketContent) {
      products.push(listId.id);
    }
    localStorage.clear();
    // on envoie en POST
    fetch(url + "/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, products }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("order", JSON.stringify(data));
        window.location.href = "commande.html";
      })
      .catch((error) =>
        alert("Un des champ du formulaire n'est pas correct !")
      );
  } else {
    alert(
      "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
    );
  }
};
