/**
 * Clase encargada de la manipulación dinámica del DOM (Interfaz de Usuario).
 * Renderiza matrices de datos, gestiona ventanas modales de Bootstrap y emite respuestas visuales (Alertas).
 */
export class UI {
    constructor() {
        this.tbody = document.getElementById("tbodyContactos");
        this.alertContainer = document.getElementById("alertContainer");
        
        // Mapeo estático inverso para resolver los IDs de categorías a partir del texto del JSON
        this.categoriasMap = {
            "Familia": 1,
            "Trabajo": 2,
            "Escuela": 3,
            "Amigos": 4,
            "Clientes": 5,
            "Alumnos": 6
        };
    }

    /**
     * Procesa la respuesta plana de la consulta SQL y agrupa por id_contacto único
     * para evitar filas duplicadas debido al JOIN uno a muchos de datos_contacto.
     */
    agruparContactos(dataRows) {
        const contactos = {};
        
        dataRows.forEach(row => {
            const id = row.id_contacto;
            if (!contactos[id]) {
                contactos[id] = {
                    id_contacto: id,
                    nombre: row.nombre,
                    apellido: row.apellido,
                    nombre_categoria: row.nombre_categoria,
                    telefonos: new Set(),
                    correos: new Set()
                };
            }
            
            if (row.tipo_dato === "Teléfono" && row.valor) {
                contactos[id].telefonos.add(row.valor);
            } else if (row.tipo_dato === "Correo" && row.valor) {
                contactos[id].correos.add(row.valor);
            }
        });
        
        return Object.values(contactos);
    }

    /**
     * Renderiza los contactos ordenados y organizados en la tabla del DOM.
     * @param {Array} dataRows Datos crudos arrojados por el endpoint de la API
     */
    mostrarContactos(dataRows) {
        this.tbody.innerHTML = "";

        if (!dataRows || dataRows.length === 0) {
            this.tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-4 text-muted font-monospace small">
                        <i class="bi bi-folder-x d-block fs-3 mb-2"></i> NO SE ENCONTRARON REGISTROS EN LA BASE DE DATOS
                    </td>
                </tr>`;
            return;
        }

        const contactosAgrupados = this.agruparContactos(dataRows);

        contactosAgrupados.forEach(c => {
            const fila = document.createElement("tr");

            // Convertir Sets a Arrays para su renderizado en etiquetas/badges individuales
            const listTelefonos = Array.from(c.telefonos).map(tel => `<span class="badge badge-phone mb-1 d-inline-block"><i class="bi bi-telephone-fill me-1 small"></i>${tel}</span>`).join(" ") || '<span class="text-muted small italic">Ninguno</span>';
            const listCorreos = Array.from(c.correos).map(corr => `<span class="badge badge-email mb-1 d-inline-block"><i class="bi bi-envelope-fill me-1 small"></i>${corr}</span>`).join(" ") || '<span class="text-muted small italic">Ninguno</span>';

            fila.innerHTML = `
                <td class="text-center font-monospace text-muted fw-bold">${c.id_contacto}</td>
                <td>
                    <div class="fw-semibold text-white">${c.nombre} ${c.apellido}</div>
                </td>
                <td>
                    <span class="badge badge-category">${c.nombre_categoria}</span>
                </td>
                <td><div class="d-flex flex-wrap gap-1">${listTelefonos}</div></td>
                <td><div class="d-flex flex-wrap gap-1">${listCorreos}</div></td>
                <td class="text-center">
                    <div class="d-inline-flex gap-1">
                        <button class="action-btn btn-edit-action btn-actualizar-trigger" 
                                data-id="${c.id_contacto}" 
                                data-nombre="${c.nombre}" 
                                data-apellido="${c.apellido}" 
                                data-categoria="${c.nombre_categoria}"
                                title="Actualizar Datos">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="action-btn btn-delete-action btn-eliminar-trigger" 
                                data-id="${c.id_contacto}" 
                                data-nombre="${c.nombre} ${c.apellido}"
                                title="Eliminar Registro">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </div>
                </td>
            `;
            this.tbody.appendChild(fila);
        });
    }

    /**
     * Carga de manera automática los datos del contacto seleccionado dentro del formulario de actualización.
     */
    prepararFormActualizar(btnTrigger) {
        const id = btnTrigger.getAttribute("data-id");
        const nombre = btnTrigger.getAttribute("data-nombre");
        const apellido = btnTrigger.getAttribute("data-apellido");
        const categoriaNombre = btnTrigger.getAttribute("data-categoria");
        
        document.getElementById("editIdContacto").value = id;
        document.getElementById("editNombre").value = nombre;
        document.getElementById("editApellido").value = apellido;
        
        // Determinar ID numérico de la categoría a partir del mapa de nombres
        const idCategoria = this.categoriasMap[categoriaNombre] || 1;
        document.getElementById("editCategoria").value = idCategoria;
        
        // Dejar el campo de fecha vacío o listo para nueva entrada
        document.getElementById("editFechaNacimiento").value = "";
    }

    /**
     * Despliega una alerta dinámica con estilos modernos de Bootstrap que se desvanece automáticamente.
     */
    mostrarAlerta(mensaje, tipo = "success") {
        const id = "alert_" + Date.now();
        const icon = tipo === "success" ? "bi-check-circle-fill" : (tipo === "danger" ? "bi-slash-circle-fill" : "bi-exclamation-triangle-fill");
        const customClass = tipo === "success" ? "border-success text-success" : (tipo === "danger" ? "border-danger text-danger" : "border-warning text-warning");

        const htmlAlert = `
            <div class="alert alert-dark border ${customClass} alert-dismissible fade show shadow mb-4" role="alert" id="${id}">
                <div class="d-flex align-items-center">
                    <i class="bi ${icon} me-2 fs-5"></i>
                    <div>${mensaje}</div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        this.alertContainer.insertAdjacentHTML("beforeend", htmlAlert);

        // Destrucción controlada de la alerta después de 4 segundos
        setTimeout(() => {
            const alertElem = document.getElementById(id);
            if (alertElem) {
                const bsAlert = new bootstrap.Alert(alertElem);
                bsAlert.close();
            }
        }, 4000);
    }
}
