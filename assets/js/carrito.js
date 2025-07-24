document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const iconoCarrito = document.getElementById('icono-carrito');
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    const contadorCarrito = document.querySelector('.content-shopping-cart .numer');

    function actualizarTablaCarrito() {
        if (!listaCarrito || !contadorCarrito) return;
        listaCarrito.innerHTML = '';
        let totalCantidad = 0;

        carrito.forEach(prod => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><img src="${prod.imagen}" width="40" /></td>
                <td>${prod.nombre}</td>
                <td>${prod.talla || '-'}</td>
                <td>${prod.cantidad}</td>
                <td>$${(prod.precio * prod.cantidad).toFixed(2)}</td>
            `;
            listaCarrito.appendChild(fila);
            totalCantidad += prod.cantidad;
        });

        contadorCarrito.textContent = `(${totalCantidad})`;
    }
    

    if (iconoCarrito) {
  iconoCarrito.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que otros clics interfieran
    carritoDesplegable.classList.toggle('hidden');
        });
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            carrito.length = 0;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarTablaCarrito();
        });
    }

    actualizarTablaCarrito();
});
