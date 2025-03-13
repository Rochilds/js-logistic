// Array para almacenar pedidos
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// Función para agregar un pedido
function agregarPedido(event) {
    event.preventDefault();

    let cliente = document.getElementById("cliente").value;
    let direccion = document.getElementById("direccion").value;
    let producto = document.getElementById("producto").value;

    if (cliente === "" || direccion === "" || producto === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let nuevoPedido = {
        id: Date.now(),
        cliente,  // Se corrige 'nombre' por 'cliente'
        direccion,
        producto
    };

    pedidos.push(nuevoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    mostrarPedidos();
    document.getElementById("formPedido").reset(); // Se corrige el ID
}

// Función para mostrar pedidos en la página
function mostrarPedidos() {
    let pedidoList = document.getElementById("listaPedidos"); // Se corrige el ID
    pedidoList.innerHTML = "";

    pedidos.forEach(pedido => {
        let div = document.createElement("div");
        div.classList.add("pedido-item");
        div.innerHTML = `
            <p><span>Cliente:</span> ${pedido.cliente}</p>
            <p><span>Dirección:</span> ${pedido.direccion}</p>
            <p><span>Producto:</span> ${pedido.producto}</p>
            <button class="btn btn-danger" onclick="eliminarPedido(${pedido.id})">Eliminar</button>
        `;
        pedidoList.appendChild(div);
    });
}

// Función para eliminar un pedido
function eliminarPedido(id) {
    pedidos = pedidos.filter(pedido => pedido.id !== id);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    mostrarPedidos();
}

// Eventos
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("formPedido");

    if (form) {
        form.addEventListener("submit", agregarPedido);
    } else {
        console.error("No se encontró el formulario con ID 'formPedido'");
    }

    mostrarPedidos();
});

