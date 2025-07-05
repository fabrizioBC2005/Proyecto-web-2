

// Funcionalidad para botón "Ver más productos"
document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const botonesAgregar = document.querySelectorAll('.add-cart');
    const iconoCarrito = document.getElementById('icono-carrito');
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    const contadorCarrito = document.querySelector('.content-shopping-cart .numer');

    // Toggle del carrito desplegable
    iconoCarrito.addEventListener('click', () => {
        carritoDesplegable.classList.toggle('hidden');
    });

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const card = boton.closest('.card-product');
            const nombre = card.querySelector('h3').textContent.trim();
            const precio = card.querySelector('.price').childNodes[0].textContent.trim();
            const imagen = card.querySelector('img').src;

            const producto = {
                nombre,
                precio,
                imagen
            };

            carrito.push(producto);
            actualizarCarrito();
        });
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.length = 0;
        actualizarCarrito();
    });

    function actualizarCarrito() {
        listaCarrito.innerHTML = '';

        carrito.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}" alt=""></td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            `;
            listaCarrito.appendChild(row);
        });

        contadorCarrito.textContent = `(${carrito.length})`;
    }
});

const productos = {
    destacados: [
        { nombre: "Camiseta Blanca", precio: 119.99, imagen: "assets/css/white front.jpg" },
        { nombre: "Hoddie Cropped", precio: 119.99, imagen: "assets/css/cropped hodddie.jpg" },
        { nombre: "Camiseta FC Barcelona", precio: 109.99, imagen: "assets/css/Travis Scott x Nike Camiseta FC Barcelona Retro.jpg" },
        { nombre: "Jean baggy negro", precio: 109.99, imagen: "assets/css/jeans baggy.jpg" }
    ],
    recientes: [
        { nombre: "Jean Baggy Negra", precio: 119.99, imagen: "assets/css/Jean_méga_baggy_-_Homme-removebg-preview.png" },
        { nombre: "Hoddie Gris Boxy Fit", precio: 119.99, imagen: "assets/css/hoddie boxy -gris.png" },
        { nombre: "hoddie negra", precio: 89.99, imagen: "assets/css/hoddie negra.jpg" },
        { nombre: "Camiseta FC Barcelona", precio: 109.99, imagen: "assets/css/Travis Scott x Nike Camiseta FC Barcelona Retro.jpg" }
    ],
    vendidos: [
        { nombre: "Camiseta StreetWear", precio: 119.99, imagen: "assets/css/camiseta nY.jpg" },
        { nombre: "Stussy Beanie Black", precio: 119.99, imagen: "assets/css/Stussy black beanie.jpg" },
        { nombre: "Lentes Balenciaga", precio: 99.99, imagen: "assets/css/lentes.jpg" },
        { nombre: "Camiseta Crema", precio: 119.99, imagen: "assets/css/cream front.jpg" }
    ]
};

const spans = document.querySelectorAll('.container-options span');
const contenedor = document.getElementById('products-container');

function renderizarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(producto => {
        const div = document.createElement("div");
        div.className = "card-product";
        div.innerHTML = `
            <div class="container-img">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <span class="discount">-10%</span>
                <div class="button-group">
                    <span><i class="fa-regular fa-eye"></i></span>
                    <span><i class="fa-regular fa-heart"></i></span>
                    <span><i class="fa-solid fa-code-compare"></i></span>
                </div>
            </div>
            <div class="content-card-product">
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <h3>${producto.nombre}</h3>
                <span class="add-cart"><i class="fa-solid fa-basket-shopping"></i></span>
                <p class="price">$${producto.precio.toFixed(2)} <span>$130.00</span></p>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

spans.forEach(span => {
    span.addEventListener("click", () => {
        spans.forEach(s => s.classList.remove("active"));
        span.classList.add("active");
        const filtro = span.dataset.filter;
        renderizarProductos(productos[filtro]);
    });
});

// Mostrar por defecto los destacados
renderizarProductos(productos.destacados);
