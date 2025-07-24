function mostrarCantidadCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.querySelector('.content-shopping-cart .numer');
  if (contador) {
    let total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = `(${total})`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarCantidadCarrito();
});