/**
 * Clase encargada de encapsular todas las solicitudes HTTP fetch haca el servidor de la API REST.
 * Implementa patrones de programación orientada a objetos (POO) y manejo asíncrono de datos.
 */
export class ContactoAPI {
    constructor() {
        // Base URL del Back-end desplegado públicamente en Hostinger
        this.baseUrl = "https://backend.gaelquiroz.online/api-contactos/index.php";
    }

    /**
     * Realiza una petición genérica con manejo de errores centralizado.
     */
    async _request(url, options = {}) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP status error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error crítico en la comunicación de red:", error);
            return { ok: false, mensaje: "Error de conexión o de red", error: error.message };
        }
    }

    /**
     * Obtiene el listado completo y detallado de contactos con sus datos de comunicación enlazados.
     */
    async getContactosCompletos() {
        const url = `${this.baseUrl}?accion=contactos-completos`;
        return await this._request(url, { method: "GET" });
    }

    /**
     * Agrega un nuevo contacto al sistema junto con su número telefónico y correo iniciales (Contacto Completo).
     * @param {Object} contacto Objeto con datos: nombre, apellido, fecha_nacimiento, id_categoria, telefono, correo
     */
    async agregarContactoCompleto(contacto) {
        const url = `${this.baseUrl}?accion=agregar-contacto-completo`;
        return await this._request(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contacto)
        });
    }

    /**
     * Actualiza los datos nucleares de un registro de contacto (Nombre, Apellido, Categoría y Fecha de Nacimiento).
     * @param {Object} contacto Objeto con datos: id_contacto, nombre, apellido, fecha_nacimiento, id_categoria
     */
    async actualizarContacto(contacto) {
        const url = `${this.baseUrl}?accion=actualizar-contacto`;
        return await this._request(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contacto)
        });
    }

    /**
     * Remueve físicamente un registro de la base de datos a partir de su ID. El Back-end limpia de forma en cascada sus datos_contacto.
     * @param {number} idContacto ID único del contacto a eliminar
     */
    async eliminarContacto(idContacto) {
        const url = `${this.baseUrl}?accion=eliminar-contacto`;
        return await this._request(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_contacto: idContacto })
        });
    }
}
