// ✅ script.js - Versión final con clase, fetch, librería, almacenamiento y DOM

// 🧩 Clase para instanciar pedidos
class Pedido {
    constructor(cliente, direccion, producto) {
        this.id = Date.now();
        this.cliente = cliente;
        this.direccion = direccion;
        this.producto = producto;
        this.realizado = false;
        this.motivo = "";
    }
}

// 📦 Array de pedidos desde storage o vacío
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// 🔁 Mostrar pedidos al cargar
document.addEventListener("DOMContentLoaded", () => {
    fetchPedidosPrevios();
    renderPedidos();
    document.getElementById("formPedido").addEventListener("submit", agregarPedido);
});

// // 📥 Función para agregar nuevo pedido
function agregarPedido(e) {

    const cliente = document.getElementById("cliente").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const producto = document.getElementById("producto").value.trim();

    if (!cliente || !direccion || !producto) return Toastify({ text: "Completa todos los campos", backgroundColor: "#F44336" }).showToast();

    const pedido = new Pedido(cliente, direccion, producto);
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    renderPedidos();
    document.getElementById("formPedido").reset();

    Toastify({ text: "Pedido agregado ✅", backgroundColor: "#4CAF50" }).showToast();
}

// 🧹 Renderizar pedidos en el DOM
function renderPedidos() {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";
    pedidos.forEach(pedido => {
        const div = document.createElement("div");
        div.className = "pedido-item";
        div.innerHTML = `
            <p><strong>Cliente:</strong> ${pedido.cliente}</p>
            <p><strong>Dirección:</strong> ${pedido.direccion}</p>
            <p><strong>Producto:</strong> ${pedido.producto}</p>
            <button class="btn btn-success" data-id="${pedido.id}" data-action="realizado">Marcar como Realizado</button>
            <button class="btn btn-danger" data-id="${pedido.id}" data-action="eliminar">Eliminar</button>
        `;
        lista.appendChild(div);
    });
    // Delegación de eventos
    lista.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", manejarAccion);
    });
}

// 🧠 Manejar acciones de los botones
function manejarAccion(e) {
    const id = parseInt(e.target.dataset.id);
    const accion = e.target.dataset.action;

    if (accion === "eliminar") {
        Swal.fire({
            title: '¿Por qué se elimina?',
            input: 'text',
            inputPlaceholder: 'Motivo de la eliminación',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
        }).then(result => {
            if (result.isConfirmed) {
                pedidos = pedidos.filter(p => p.id !== id);
                localStorage.setItem("pedidos", JSON.stringify(pedidos));
                renderPedidos();
                Toastify({ text: "Pedido eliminado", backgroundColor: "#F44336" }).showToast();
            }
        });

    } else if (accion === "realizado") {
        const pedido = pedidos.find(p => p.id === id);
        if (pedido) {
            pedido.realizado = true;
            localStorage.setItem("pedidos", JSON.stringify(pedidos));
            Toastify({ text: "Pedido marcado como realizado", backgroundColor: "#2196F3" }).showToast();
        }
    }
    renderPedidos();
}

// 🔄 Simula fetch de pedidos anteriores desde JSON local
async function fetchPedidosPrevios() {
    try {
        const res = await fetch("data.json");
        const data = await res.json();
        if (!localStorage.getItem("pedidos")) {
            pedidos = data.map(p => new Pedido(p.cliente, p.direccion, p.producto));
            localStorage.setItem("pedidos", JSON.stringify(pedidos));
        }
    } catch (error) {
        console.warn("Error cargando pedidos simulados", error);
    }
}

