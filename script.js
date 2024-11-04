// Validación de texto para nombre sin números
function validarNombre(nombre) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre);
}

// Validación de cantidad y precio
function validarCantidadPrecio(valor) {
    return valor > 0;
}

// Función para guardar o actualizar un producto
function guardarProducto() {
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const editarIndice = document.getElementById('editarIndice').value;

    // Validaciones
    if (!validarNombre(nombre)) {
        alert('El nombre solo debe contener letras.');
        return;
    }
    if (!validarCantidadPrecio(cantidad)) {
        alert('La cantidad debe ser mayor a 0.');
        return;
    }
    if (!validarCantidadPrecio(precio)) {
        alert('El precio debe ser mayor a 0.');
        return;
    }
    
    const productosTable = document.getElementById('productosTable');
    const nuevaFila = `
        <tr>
            <td>${nombre}</td>
            <td>${categoria}</td>
            <td>${cantidad}</td>
            <td>${precio.toFixed(2)}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editarProducto(this)">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(this)">Eliminar</button>
            </td>
        </tr>`;

    if (editarIndice) {
        productosTable.rows[editarIndice].innerHTML = nuevaFila;
    } else {
        productosTable.innerHTML += nuevaFila;
    }

    // Limpiar el formulario y cerrar modal
    document.getElementById('productoForm').reset();
    document.getElementById('editarIndice').value = '';
    document.querySelector('.btn-close').click();
}

// Función para editar un producto
function editarProducto(button) {
    const fila = button.closest('tr');
    const indice = fila.rowIndex - 1;
    const nombre = fila.cells[0].textContent;
    const categoria = fila.cells[1].textContent;
    const cantidad = fila.cells[2].textContent;
    const precio = fila.cells[3].textContent;

    document.getElementById('nombre').value = nombre;
    document.getElementById('categoria').value = categoria;
    document.getElementById('cantidad').value = cantidad;
    document.getElementById('precio').value = precio;
    document.getElementById('editarIndice').value = indice;

    new bootstrap.Modal(document.getElementById('modalProducto')).show();
}

// Función para eliminar un producto
function eliminarProducto(button) {
    const fila = button.closest('tr');
    fila.remove();
}
