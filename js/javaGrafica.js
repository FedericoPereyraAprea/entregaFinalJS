//DOM
// ROOT
const ROOT = document.documentElement;

//CARRITO
const abrirCarrito = document.querySelector(".carritoLogo");
const carritoPadre = document.querySelector(".carritoPadre");
const backdropCarrito = document.querySelector(".backdrop");
const bodyCarrito = document.querySelector(".bodyCarrito");
const finalizarCompra = document.querySelector(".finalizarCompra")

// INICIO SESION Y FOOTER
const iniciarSesion = document.getElementById("formIniciarSesion");
const consultaFooter = document.getElementById("consultaFooter");

//PRODUCTOS Y CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
fetch("./productos.json")
  .then((response) => response.json())
  .then((productos) => {
    productos.forEach((producto) => {
      let { id, nombre, precio, stock } = producto;
      divproductos.innerHTML += `
			<div id="producto${id}">
			<img class="imagenesA" src="${producto.imagen}">
			<button id="boton${producto.id}" class="carritoBoton botonclick">Añadir al carrito</button>	
		`;
    });
    productos.forEach((producto) => {
      document
        .getElementById(`boton${producto.id}`)
        .addEventListener("click", () => {
          const IndexProductos = carrito.findIndex(
            (productosCarrito) => productosCarrito.nombre == producto.nombre
          );
          if (IndexProductos >= 0) {
            carrito[IndexProductos].cant++;
          } else {
            carrito.push({
              ...producto,
              cant: 1,
            });
          }
          localStorage.setItem("carrito", JSON.stringify(carrito));
          Toastify({
            text: "¡Producto agregado con éxito!",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #43be4d, cornflowerblue)",
            },
            onClick: function () {},
          }).showToast();
        });
    });
  });

// ICONO QUE ABRE EL CARRITO Y FINALIZAR COMPRA
abrirCarrito.addEventListener("click", () => {
  carritoPadre.classList.remove("oculto");
  ROOT.classList.add("noScroll");
  const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
  console.log("carrito", carrito);
  let total = 0;
  const childrenCarrito = carrito.map((producto) => {
    const row = document.createElement("div");
    row.innerHTML = `
	<img src="${producto.imagen}" width=100>
	<p>${producto.nombre}</p>
	<p>$${producto.precio}</p>	
	<p>x${producto.cant}</p>	
	<p>subtotal: $${producto.cant * producto.precio}</p>	
	`;
    total = total + producto.cant * producto.precio;
    row.className = "rowProducto";
    return row;
  });
  const textoTotal = document.createElement("h3");
  textoTotal.className = "totalCarrito";
  textoTotal.innerHTML = `TOTAL: $${total}`;
  bodyCarrito.replaceChildren(...childrenCarrito, textoTotal);
});

finalizarCompra.addEventListener("click", (event) => {
  Swal.fire({
    title: "¡Gracias por confiar en GraficaB377! <br> Te enviamos un correo con los pasos a seguir.",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  })
});

//BACKDROP QUE CIERRA EL CARRITO
backdropCarrito.addEventListener("click", () => {
  carritoPadre.classList.add("oculto");
  ROOT.classList.remove("noScroll");
});

//INICIO DE SESION
class usuario {
  constructor(usuario, contraseña) {
    this.usuario = usuario;
    this.contraseña = contraseña;
  }
}

//INICIO DE SESION Y CONSULTA POR FOOTER
let user = [];
localStorage.setItem("user", JSON.stringify(user));
iniciarSesion.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = document.querySelector(".usuarioInput").value;
  let contraseña = document.querySelector(".contraseñaInput").value;
  let user = { usuario: email, contraseña: contraseña };
  localStorage.setItem("user", JSON.stringify(user));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "¡Bienvenido a GráficaB377!",
    showConfirmButton: false,
    timer: 3000,
  });
  iniciarSesion.reset();
});
let correoConsulta = [];
localStorage.setItem("correoConsulta", JSON.stringify(correoConsulta));
consultaFooter.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = document.querySelector(".correoFooter").value;
  let asunto = document.querySelector(".asuntoFooter").value;
  let consulta = document.querySelector(".textoFooter").value;
  let correoConsulta = { contacto: email, Asunto: asunto, consulta: consulta };
  localStorage.setItem("correoConsulta", JSON.stringify(correoConsulta));
  Swal.fire({
    title: "¡Consulta Enviada con Exito! <br> Te responderemos a la brevedad.",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
  consultaFooter.reset();
});
