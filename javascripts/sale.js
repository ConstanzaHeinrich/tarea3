
  // Lista de productos con su id, nombre y precio
  const productos = [
    { id: 1, nombre: "Mezcla original 200g", precio: 500 },
    { id: 2, nombre: "Mezcla original 500g", precio: 900 },
    { id: 3, nombre: "Mezcla especial 200g", precio: 700 },
    { id: 4, nombre: "Mezcla especial 500g", precio: 1200 }
  ];

  // Elementos del DOM donde se selecciona el producto y la cantidad
  const elementoProducto = document.getElementById("product");
  const elementoCantidad = document.getElementById("number");

  // Array para almacenar las compras realizadas
  let compras = [];

  // Función para añadir un producto a la lista de compras
  function añadir() {
    const precioObjetivo = parseInt(elementoProducto.value);
    const producto = productos.find(item => item.precio === precioObjetivo);
    const cantidad = parseInt(elementoCantidad.value);

    // Crear el objeto compra
    let compra = { producto: producto, cantidad: cantidad };

    // Buscar si el producto ya está en la lista de compras
    const indiceCompraExistente = compras.findIndex(item => item.producto.id === compra.producto.id);

    // Si no existe, añadir; si existe, actualizar la cantidad
    if (indiceCompraExistente === -1) {
      compras.push(compra);
    } else {
      compras[indiceCompraExistente].cantidad += compra.cantidad;
    }

    // Mostrar el detalle de la compra y el subtotal
    alert(`${mostrarCompras()}\nSubtotal: ${subtotal()} yenes`);

    // Limpiar los campos de entrada
    elementoProducto.value = "0";
    elementoCantidad.value = "";
  }

  // Función para calcular el subtotal de las compras
  function subtotal() {
    return compras.reduce((total, compra) => total + compra.producto.precio * compra.cantidad, 0);
  }

  // Función para mostrar las compras realizadas
  function mostrarCompras() {
    return compras.map(compra => `${compra.producto.nombre} ${compra.producto.precio} yenes: ${compra.cantidad} unidades`).join("\n");
  }

  // Función para calcular el coste del envío basado en el subtotal
  function calcularEnvio(subtotal) {
    if (subtotal === 0 || subtotal >= 3000) {
      return 0;
    } else if (subtotal < 2000) {
      return 500;
    } else {
      return 250;
    }
  }

  // Función para calcular el total final (subtotal + envío)
  function calcularTotal() {
    const sum = subtotal();
    const envio = calcularEnvio(sum);
    alert(`${mostrarCompras()}\nSubtotal: ${sum} yenes, Envío: ${envio} yenes. Total: ${sum + envio} yenes`);

    // Limpiar las compras y los campos de entrada
    compras = [];
    elementoProducto.value = "0";
    elementoCantidad.value = "";
  }

  // Asignar funciones a los botones
  document.querySelector('input[value="añadir"]').onclick = añadir;
  document.querySelector('input[value="importe total"]').onclick = calcularTotal;

