document.addEventListener('DOMContentLoaded', () => {
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

    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const iconoCarrito = document.getElementById('icono-carrito');
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    const contadorCarrito = document.querySelector('.content-shopping-cart .numer');

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
                    <span class="btn-ver-producto" 
                          data-nombre="${producto.nombre}" 
                          data-precio="${producto.precio}" 
                          data-img="${producto.imagen}">
                          <i class="fa-regular fa-eye"></i>
                    </span>
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

        // Asignar eventos a los nuevos botones "add-cart"
        document.querySelectorAll('.add-cart').forEach(boton => {
            boton.addEventListener('click', () => {
                const card = boton.closest('.card-product');
                const nombre = card.querySelector('h3').textContent.trim();
                const precio = parseFloat(card.querySelector('.price').childNodes[0].textContent.trim().replace('$', ''));
                const imagen = card.querySelector('img').src;

                const talla = card.querySelector('.select-talla').value;
if (!talla) {
    alert("Por favor, selecciona una talla.");
    return;
}
const producto = { nombre, precio, imagen, talla, cantidad: 1 };
                
                

                const existente = carrito.find(item => item.nombre === producto.nombre);
                if (existente) {
                    existente.cantidad++;
                } else {
                    carrito.push(producto);
                }

                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
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

    
   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  // 
   //  //  //  //  //   // CARRITO FUNCIONALIDAD //  //  //  //  //  // 
   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  //

    // Modal visualización
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const closeModal = document.getElementById("closeModal");

    document.addEventListener("click", (e) => {
        if (e.target.closest(".btn-ver-producto")) {
            const btn = e.target.closest(".btn-ver-producto");
            modalImg.src = btn.dataset.img;
            modalTitle.textContent = btn.dataset.nombre;
            modalPrice.textContent = `Precio: $${parseFloat(btn.dataset.precio).toFixed(2)}`;
            modal.style.display = "flex";
        }

        if (e.target.id === "closeModal" || e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Toggle carrito
    iconoCarrito.addEventListener('click', () => {
        carritoDesplegable.classList.toggle('hidden');
    });

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.length = 0;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    });

    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        let totalCantidad = 0;

        carrito.forEach(producto => {
            const row = document.createElement('tr');
            const precioTotal = (producto.precio * producto.cantidad).toFixed(2);
            row.innerHTML = `
                <td><img src="${producto.imagen}" width="40" /></td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${precioTotal}</td>
            `;
            listaCarrito.appendChild(row);
            totalCantidad += producto.cantidad;
        });

        contadorCarrito.textContent = `(${totalCantidad})`;
    }

    // Cargar por defecto
    renderizarProductos(productos.destacados);
    actualizarCarrito();
});


   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  // 
   //  //  //  //  //   // //  //  //  //  //  // 
   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  //

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('click', e => {
    const card = e.target.closest('.card-product');
    if (card) {
        const img = card.querySelector('img').src;
        const nombre = card.querySelector('h3').textContent;
        const precio = card.querySelector('.price').textContent;

        document.getElementById('modal-img').src = img;
        document.getElementById('modal-nombre').textContent = nombre;
        document.getElementById('modal-precio').textContent = `Precio: ${precio}`;
        document.getElementById('modal-descripcion').textContent = "Este es un producto exclusivo de nuestra tienda, hecho con materiales de alta calidad.";

        document.getElementById('modal-producto').classList.remove('hidden');
    }

    if (e.target.id === 'cerrar-modal' || e.target.id === 'modal-producto') {
        document.getElementById('modal-producto').classList.add('hidden');
    }
});

// Añadir al carrito desde el modal
document.getElementById('btn-agregar-carrito').addEventListener('click', () => {
    const nombre = document.getElementById('modal-nombre').textContent;
    const precioTexto = document.getElementById('modal-precio').textContent;
    const precio = parseFloat(precioTexto.replace('Precio: $', '').trim());
    const imagen = document.getElementById('modal-img').src;
    const talla = document.getElementById('select-talla').value;

    const producto = {
        nombre,
        precio,
        imagen,
        talla,
        cantidad: 1
    };

    const productoExistente = carrito.find(item => item.nombre === producto.nombre && item.talla === producto.talla);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push(producto);
    }

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Cerrar modal
    document.getElementById('modal-producto').classList.add('hidden');

    // ✅ Actualizar la tabla visual del carrito
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const contador = document.querySelector('.content-shopping-cart .numer');
    listaCarrito.innerHTML = ''; // Limpiar antes de pintar

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

    // Actualizar contador visual
    contador.textContent = `(${totalCantidad})`;
});



document.getElementById('form-busqueda').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita recargar la página

    const textoBusqueda = this.querySelector('input').value.toLowerCase().trim();

    if (!textoBusqueda) return;

    const resultados = [];

    // Buscar en cada categoría de productos
    Object.values(productos).forEach(lista => {
        lista.forEach(producto => {
            if (producto.nombre.toLowerCase().includes(textoBusqueda)) {
                resultados.push(producto);
            }
        });
    });

    // Renderizar resultados
    if (resultados.length > 0) {
        renderizarProductos(resultados);
    } else {
        contenedor.innerHTML = `<p style="color: white; font-size: 1.4rem;">No se encontraron productos.</p>`;
    }
});




   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  // 
   //  //  //  //  // modal soporte // //  //  //  //  //  // 
   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  //

  function abrirSoporte() {
    document.getElementById("modal-soporte").style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";
  }

  function cerrarSoporte() {
    document.getElementById("modal-soporte").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
  }

  // Cerrar al hacer clic fuera del modal
  window.onclick = function(event) {
    const modal = document.getElementById("modal-soporte");
    const overlay = document.getElementById("modal-overlay");
    if (event.target === overlay) {
      cerrarSoporte();
    }
  };



 //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  // 
   //  //  //  //  // BUSQUEDA// //  //  //  //  //  // 
   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  //

 document.getElementById("form-busqueda").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("input-busqueda").value.trim().toLowerCase();

    // Redirecciones según el término buscado
    if (query.includes("camiseta")) {
      window.location.href = "Camisetas.htm";
    } else if (query.includes("sudadera")) {
      window.location.href = "Sudaderas.htm";
    } else if (query.includes("jean")) {
      window.location.href = "Jeans.htm";
    } else if (query.includes("zapatilla")) {
      window.location.href = "Zapatillas.htm";
    } else if (query.includes("accesorio")) {
      window.location.href = "Accesorios.htm";
    } else {
      // Si no encuentra coincidencia, podrías redirigir a una página de "no encontrado"
      alert("No se encontraron resultados para: " + query);
    }
  });


 //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  // 
   //  //  //  //  // /INICIAR SESION/ //  //  //  //  //  // 
   //  //  //  //  //  // //  //  //  //  //  // //  //  //  //  //  //

   


  const nombre = localStorage.getItem("usuarioNombre");

  if (nombre) {
    document.getElementById("nombre-usuario").textContent = nombre;
    document.getElementById("btn-logout").style.display = "inline-block";
    document.getElementById("icono-login").style.display = "none"; // Oculta el icono de login
  }
   document.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("usuarioNombre");

    if (nombre) {
      const span = document.getElementById("nombre-usuario");
      const logoutBtn = document.getElementById("btn-logout");
      const iconLogin = document.getElementById("icono-login");

      if (span && logoutBtn && iconLogin) {
        span.textContent = nombre;
        logoutBtn.style.display = "inline-block";
        iconLogin.style.display = "none";
      }
    }
  });

  function cerrarSesion() {
    localStorage.removeItem("usuarioNombre");
    window.location.reload();
  }