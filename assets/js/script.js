let listaNombresGastos = [];
let listaValoresGastos = [];

function clickBoton() {
  let nomGasto = document.getElementById("nombreGasto").value;
  let valGasto = document.getElementById("valorGasto").value;

  if (!nomGasto || valGasto === "" || Number(valGasto) <= 0) {
    alert("Por favor, ingresa un nombre de gasto válido y un valor mayor a 0.");
    return; // No continúa si el valor es 0 o nulo
  }

  listaNombresGastos.push(nomGasto);
  listaValoresGastos.push(valGasto);

  // Limpiar los campos de entrada
  document.getElementById("nombreGasto").value = "";
  document.getElementById("valorGasto").value = "";

  actualizarListaGastos();
}

function actualizarListaGastos() {
  const listaElementos = document.getElementById("listaDeGastos");
  const totalElementos = document.getElementById("totalGastos");

  let htmlLista = "";
  let totalGastos = 0;

  listaNombresGastos.forEach((elemento, posicion) => {
    const valorGasto = listaValoresGastos[posicion];
    htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} <button onclick="eliminarGasto(${posicion});">
            Borrar Gasto
          </button></li>`;
    totalGastos += Number(valorGasto);
  });
  listaElementos.innerHTML = htmlLista;
  totalElementos.innerHTML = totalGastos.toFixed(2);
}

function eliminarGasto(posicion) {
  listaNombresGastos.splice(posicion, 1);
  listaValoresGastos.splice(posicion, 1);
  actualizarListaGastos();
}
