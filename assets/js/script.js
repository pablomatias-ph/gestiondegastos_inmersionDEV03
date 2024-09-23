let listaNombresGastos = [];
let listaDescripcionGastos = [];
let listaValoresGastos = [];

// Variable que se usa como switch de modo ingreso o edicion
let listaEditar = -1;

function clickBoton() {
  let nomGasto = document.getElementById("nombreGasto").value;
  let descGasto = document.getElementById("descripcionGasto").value;
  let valGasto = document.getElementById("valorGasto").value;

  // Control de datos, impide datos nulos o 0
  if (!nomGasto || !descGasto || valGasto === "" || Number(valGasto) <= 0) {
    alert("Por favor, ingresa un nombre, descripción y valor válidos.");
    return;
  }

  // Alerta de gastos mayores a USD 150
  if (Number(valGasto) > 150) {
    alert("El valor del gasto supera los 150 USD.");
  }
  // El if para swichear entre edicion o carga de dato nuevo
  if (listaEditar === -1) {

    listaNombresGastos.push(nomGasto);
    listaDescripcionGastos.push(descGasto);
    listaValoresGastos.push(parseFloat(valGasto));
  } else {
    
    listaNombresGastos[listaEditar] = nomGasto;
    listaDescripcionGastos[listaEditar] = descGasto;
    listaValoresGastos[listaEditar] = parseFloat(valGasto);
    listaEditar = -1; 
    document.getElementById("botonFormulario").innerText = "Agregar Gasto";
  }

  
  document.getElementById("nombreGasto").value = "";
  document.getElementById("descripcionGasto").value = "";
  document.getElementById("valorGasto").value = "";

  actualizarListaGastos();
}

function actualizarListaGastos() {
  const listaElementos = document.getElementById("listaDeGastos");
  const totalElementos = document.getElementById("totalGastos");

  let htmlLista = "";
  let totalGastos = 0;

  listaNombresGastos.forEach((elemento, posicion) => {
    const descripcion = listaDescripcionGastos[posicion];
    const valorGasto = listaValoresGastos[posicion];

    htmlLista += `<li>
      ${elemento} - ${descripcion} - USD ${valorGasto.toFixed(2)} 
      <button onclick="editarGasto(${posicion});">
        <i class="fas fa-edit"></i> <!-- Ícono de editar -->
      </button>
      <button onclick="eliminarGasto(${posicion});">
        <i class="fas fa-trash-alt"></i> <!-- Ícono de eliminar -->
      </button>
    </li>`;
    totalGastos += Number(valorGasto);
  });

  listaElementos.innerHTML = htmlLista;
  totalElementos.innerHTML = totalGastos.toFixed(2);
}

function eliminarGasto(posicion) {
  listaNombresGastos.splice(posicion, 1);
  listaDescripcionGastos.splice(posicion, 1);
  listaValoresGastos.splice(posicion, 1);
  actualizarListaGastos();
}

// La funcion editar se paso de un prompt a los campos del formulario
function editarGasto(posicion) {
  document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
  document.getElementById("descripcionGasto").value = listaDescripcionGastos[posicion];
  document.getElementById("valorGasto").value = listaValoresGastos[posicion];

  listaEditar = posicion;
  document.getElementById("botonFormulario").innerText = "Guardar Cambios";
}