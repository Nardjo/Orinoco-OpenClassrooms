const order = JSON.parse(localStorage.getItem("order")) || [];

// affiche Mes informations
document.getElementById("firstNameElt").textContent = order.contact.firstName
document.getElementById("orderIdElt").textContent = order.orderId
document.getElementById("emailElt").textContent = order.contact.email
document.getElementById("fullName").textContent = order.contact.firstName +" "+ order.contact.lastName
document.getElementById("addressElt").textContent = order.contact.address
document.getElementById("cityElt").textContent = order.contact.city
