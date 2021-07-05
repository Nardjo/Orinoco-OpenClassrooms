const url = "http://localhost:3000/api/cameras";
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
