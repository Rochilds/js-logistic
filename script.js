// 📦 SIMULADOR DE PEDIDOS PARA JVR LOGÍSTICA 📦

// 1️⃣ Array para almacenar pedidos
let pedidos = [];

// 2️⃣ Función para agregar un nuevo pedido
function agregarPedido() {
    let nombre = prompt("Ingrese el nombre del cliente:");
    let direccion = prompt("Ingrese la dirección de entrega:");
    let tipoPaquete = prompt("Ingrese el tipo de paquete (Pequeño / Mediano / Grande):");

    if (!nombre || !direccion || !tipoPaquete) {
        alert("❌ Error: Todos los campos son obligatorios.");
        return;
    }

    // Se guarda en un objeto
    let pedido = {
        id: pedidos.length + 1,
        cliente: nombre,
        direccion: direccion,
        paquete: tipoPaquete
    };

    pedidos.push(pedido);
    alert(`✅ Pedido agregado con éxito. ID: ${pedido.id}`);
    console.log(`Pedido registrado: ${JSON.stringify(pedido)}`);
}

// 3️⃣ Función para mostrar todos los pedidos registrados
function mostrarPedidos() {
    if (pedidos.length === 0) {
        alert("No hay pedidos registrados.");
        return;
    }

    let listaPedidos = "📦 Pedidos Registrados 📦\n";
    pedidos.forEach(pedido => {
        listaPedidos += `ID: ${pedido.id} | Cliente: ${pedido.cliente} | Dirección: ${pedido.direccion} | Paquete: ${pedido.paquete}\n`;
    });

    console.log(listaPedidos);
    alert(listaPedidos);
}

// 4️⃣ Simulación: Agregar 2 pedidos y luego mostrarlos
alert("Bienvenido al Simulador de Pedidos de JVR Logística.");
agregarPedido();
agregarPedido();
mostrarPedidos();
