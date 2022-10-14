
//stock
let stockProductos = [
  { id: 1, nombre: 'Menta Piperita', cantidad: 1, precio: 150, stock: 8, img: "./images/01-menta-piperita.jpg" },
  { id: 2, nombre: 'Lavanda', cantidad: 1, precio: 220, stock: 10, img: "./images/lavanda.png" },
  { id: 3, nombre: 'Sansevieria Zeilanica', cantidad: 1, precio: 400, stock: 5, img: "./images/03-sanseviera-zeylanica-25l.jpg" },
  { id: 4, nombre: 'Naranjo', cantidad: 1, precio: 590, stock: 4, img: "./images/04-naranjo-lane-late-4l.jpg" },
  { id: 5, nombre: 'Potus', cantidad: 1, precio: 180, stock: 4, img: "./images/05-potus.jpg" },
  { id: 6, nombre: 'Dracaena Compacta', cantidad: 1, precio: 220, stock: 9, img: "./images/06-DRACAENA-COMPACTA.jpg" },
];


//modal
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];
const botonAbrir = document.getElementById('boton-carrito');
const botonCerrar = document.getElementById('carritoCerrar');
const modalCarrito = document.getElementsByClassName('modal-carrito')[0];


botonAbrir.addEventListener('click', () => {
  contenedorModal.classList.toggle('modal-active')
});
botonCerrar.addEventListener('click', () => {
  contenedorModal.classList.toggle('modal-active')
});

contenedorModal.addEventListener('click', (event) => {
  contenedorModal.classList.toggle('modal-active')

});
modalCarrito.addEventListener('click', (event) => {
  event.stopPropagation()
});


const contenedorProductos = document.getElementById('contenedor-productos');



const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');


const cantidad = document.getElementById('cantidad');
const precioTotal = document.getElementById('precioTotal');
const cantidadTotal = document.getElementById('cantidadTotal');

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizarCarrito()
  }
});

botonVaciar.addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
  localStorage.clear()
});


stockProductos.forEach((producto) => {
  const div = document.createElement('div')
  div.classList.add('producto')
  div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="stock">${producto.stock} unidades disponibles</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
  contenedorProductos.appendChild(div)

  const boton = document.getElementById(`agregar${producto.id}`);


  boton.addEventListener('click', () => {

    const prod = agregarAlCarrito(producto.id);


  })
})



const agregarAlCarrito = (prodId) => {


  const existe = carrito.some(prod => prod.id === prodId)

  if (existe) {
    carrito.map(prod => {
      if (prod.id === prodId) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item)
  }

  actualizarCarrito()

};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)

  const indice = carrito.indexOf(item)

  carrito.splice(indice, 1)

  actualizarCarrito()


}

const actualizarCarrito = () => {

  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

    contenedorCarrito.appendChild(div);

    localStorage.setItem('carrito', JSON.stringify(carrito))

  });

  contadorCarrito.innerText = carrito.length;
  console.log(carrito)
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

  if (carrito != []) {
    botonAbrir.style.color='#dcaf1d';
   }
   
}



