import { ContactoAPI } from "./api.js";
import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización de las capas de Servicio API y de Interfaz Gráfica
    const api = new ContactoAPI();
    const ui = new UI();

    // Instanciación de Ventanas Modales de Bootstrap para control programático de cierre
    const modalAgregarObj = new bootstrap.Modal(document.getElementById("modalAgregar"));
    const modalActualizarObj = new bootstrap.Modal(document.getElementById("modalActualizar"));
    const modalEliminarObj = new bootstrap.Modal(document.getElementById("modalEliminar"));

    // Variable temporal global al módulo para guardar el ID en cola de eliminación
    let idContactoEliminarEnCola = null;

    /**
     * Función orquestadora encargada de mandar a llamar la información y actualizar la UI.
     */
    async function cargarContenidoPrincipal() {
        // Colocar spinner de carga inicial
        document.getElementById("tbodyContactos").innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">
                    <div class="spinner-border text-neon" role="status"><span class="visually-hidden">Cargando...</span></div>
                    <p class="text-muted mt-2 mb-0 font-monospace small">CONSULTANDO MATRIZ DE SERVIDORES...</p>
                </td>
            </tr>`;
        
        const res = await api.getContactosCompletos();
        if (res.ok || Array.isArray(res.data)) {
            ui.mostrarContactos(res.data);
        } else {
            ui.mostrarAlerta("No se pudo extraer la lista de contactos del servidor central.", "danger");
        }
    }

    // ==========================================
    // BINDING DE MANEJADORES DE EVENTOS DE FORMULARIOS
    // ==========================================

    // Formulario: Envío de Nuevo Registro Completo (POST)
    document.getElementById("formAgregar").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Construcción de la carga útil con mapeo exacto de los parámetros requeridos por la API
        const payload = {
            nombre: formData.get("nombre").trim(),
            apellido: formData.get("apellido").trim(),
            fecha_nacimiento: formData.get("fecha_nacimiento") || "0000-00-00",
            id_categoria: formData.get("id_categoria"),
            telefono: formData.get("telefono").trim(),
            correo: formData.get("correo").trim()
        };

        const res = await api.agregarContactoCompleto(payload);
        if (res.ok) {
            modalAgregarObj.hide();
            e.target.reset();
            ui.mostrarAlerta("Contacto y datos de enlace insertados exitosamente en la base de datos.");
            await cargarContenidoPrincipal();
        } else {
            ui.mostrarAlerta(`Fallo al insertar registro: ${res.mensaje || "Error interno"}`, "danger");
        }
    });

    // Formulario: Actualización de Registro Base (PUT)
    document.getElementById("formActualizar").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const payload = {
            id_contacto: formData.get("id_contacto"),
            nombre: formData.get("nombre").trim(),
            apellido: formData.get("apellido").trim(),
            fecha_nacimiento: formData.get("fecha_nacimiento") || "0000-00-00",
            id_categoria: formData.get("id_categoria")
        };

        const res = await api.actualizarContacto(payload);
        if (res.ok) {
            modalActualizarObj.hide();
            ui.mostrarAlerta("Índices actualizados y sincronizados con éxito.");
            await cargarContenidoPrincipal();
        } else {
            ui.mostrarAlerta(`Fallo al actualizar registro: ${res.mensaje || "Error interno"}`, "danger");
        }
    });

    // Delegación de Eventos en la Tabla para los Botones Dinámicos de Acciones (Editar/Eliminar)
    document.getElementById("tbodyContactos").addEventListener("click", (e) => {
        // Encontrar el botón contenedor más cercano en caso de hacer click directo en el ícono i
        const btnActualizar = e.target.closest(".btn-actualizar-trigger");
        const btnEliminar = e.target.closest(".btn-eliminar-trigger");

        if (btnActualizar) {
            ui.prepararFormActualizar(btnActualizar);
            modalActualizarObj.show();
        }

        if (btnEliminar) {
            const id = btnEliminar.getAttribute("data-id");
            const nombreCompleto = btnEliminar.getAttribute("data-nombre");
            
            idContactoEliminarEnCola = id;
            document.getElementById("deleteTargetName").innerText = `ID: ${id} | ${nombreCompleto}`;
            modalEliminarObj.show();
        }
    });

    // Evento de confirmación definitivo para eliminación (DELETE)
    document.getElementById("btnConfirmarEliminar").addEventListener("click", async () => {
        if (!idContactoEliminarEnCola) return;

        const res = await api.eliminarContacto(parseInt(idContactoEliminarEnCola));
        if (res.ok) {
            modalEliminarObj.hide();
            ui.mostrarAlerta("Registro de contacto purgado por completo del sistema.", "warning");
            idContactoEliminarEnCola = null;
            await cargarContenidoPrincipal();
        } else {
            ui.mostrarAlerta(`Error al remover el registro: ${res.mensaje || "Restricción de FK"}`, "danger");
            modalEliminarObj.hide();
        }
    });

    // Control manual de recarga de datos en el Dashboard
    document.getElementById("btnRecargar").addEventListener("click", async () => {
        await cargarContenidoPrincipal();
        ui.mostrarAlerta("Sincronización manual forzada: Registros actualizados.");
    });

    // Carga inicial y arranque de la aplicación al renderizar el DOM
    cargarContenidoPrincipal();
});
