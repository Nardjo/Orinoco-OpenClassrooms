let order = JSON.parse(localStorage.getItem("order")) || [];
// call function total price
totalCalculPrice();


// affiche les informations
document.getElementById("firstNameElt").textContent = order.contact.firstName;
document.getElementById("orderIdElt").textContent = order.orderId;
document.getElementById("totalPriceOrder").textContent = total + "€";
document.getElementById("emailElt").textContent = order.contact.email;
document.getElementById("fullName").textContent =
  order.contact.firstName + " " + order.contact.lastName;
document.getElementById("addressElt").textContent = order.contact.address;
document.getElementById("cityElt").textContent = order.contact.city;

// retour à l'accueil et vidage du panier
document.getElementById("returnIndex").onclick = (event) => {
  localStorage.clear();
  window.location.href = "index.html";
};
