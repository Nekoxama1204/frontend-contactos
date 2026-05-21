# 📇 Gestión de Contactos Full-Stack

**Tecnológico Nacional de México Campus Pachuca** **Ingeniería en Sistemas Computacionales** **Actividad:** 4.3 Full-stack  

---

## 🚀 Descripción del Proyecto
Aplicación Web Full-Stack desarrollada para gestionar información de contactos, números telefónicos y correos electrónicos mediante operaciones CRUD completas. La interfaz de usuario consume una API REST propia, la cual interactúa con una base de datos MySQL utilizando Procedimientos Almacenados (Stored Procedures) para garantizar una manipulación de datos segura, encapsulada y eficiente.

## 🔗 Enlaces de Producción y Documentación de la API (Postman Ready)

* **Front-end (Interfaz GitHub Pages):** `[Aquí pon el enlace de tu GitHub Pages cuando lo actives]`
* **Back-end URL Base:** `https://backend.gaelquiroz.online/api-contactos/index.php`

> **Nota para pruebas en Postman:** Para todos los métodos `POST`, `PUT` y `DELETE`, asegúrate de configurar el encabezado (`Header`) `Content-Type: application/json` y enviar los datos en la pestaña **Body** seleccionando la opción **raw -> JSON**.

---

### 📥 Métodos GET (Consulta de Datos)

#### 1. Obtener todos los contactos con sus datos enlazados
* **URL:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=contactos-completos`
* **Descripción:** Devuelve la matriz completa de contactos con sus respectivos teléfonos, correos y categorías indexadas mediante un `INNER JOIN`.

#### 2. Obtener teléfonos principales
* **URL:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=telefonos-principales`
* **Descripción:** Filtra y devuelve únicamente los números de teléfono marcados como primarios (`es_principal = 1`) junto al nombre del contacto.

#### 3. Contar contactos por cada categoría
* **URL:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=contactos-por-categoria`
* **Descripción:** Devuelve un resumen estadístico calculando el número total de registros asociados a cada categoría existente.

#### 4. Buscar contactos filtrando por categoría específica
* **URL:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=buscar-categoria&categoria=Escuela`
* **Descripción:** Filtra el universo de contactos de acuerdo al parámetro dinámico enviado. *(Valores de prueba: `Familia`, `Trabajo`, `Escuela`, `Amigos`, `Clientes`, `Alumnos`)*.

#### 5. Listar contactos agregados recientemente
* **URL:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=contactos-recientes&limite=5`
* **Descripción:** Devuelve los últimos registros agregados ordenados por fecha de inserción descendente. El parámetro `limite` es opcional (por defecto es 5).

---

### 📤 Métodos POST (Inserción de Registros)

#### 1. Agregar contacto completo (Recomendado para pruebas rápidas)
* **URL:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=agregar-contacto-completo`
* **Carga útil (JSON Body):**
```json
{
  "nombre": "Carlos Alberto",
  "apellido": "Martínez",
  "fecha_nacimiento": "2002-08-14",
  "id_categoria": 3,
  "telefono": "7712224466",
  "correo": "carlos.mtz@escuela.edu.mx"
}

---

## 🛠️ Tecnologías y Arquitectura

**Front-end (Cliente)**
* **Estructura y Estilos:** HTML5, CSS3, Bootstrap 5.
* **Lógica:** JavaScript Moderno (ES6+), Programación Orientada a Objetos (POO) y Sistema de Módulos (`import/export`).
* **Diseño:** Interfaz moderna con temática industrial/oscura (Dark Theme + Neon UI) orientada a la experiencia de usuario.

**Back-end (Servidor)**
* **Lenguaje:** PHP 8.
* **Arquitectura:** Modelo-Vista-Controlador (MVC).
* **Base de Datos:** MySQL (MariaDB) alojada en Hostinger.
* **Seguridad:** Configuración estricta de CORS y validación de métodos HTTP.

---

## ✨ Características y Reglas de Negocio Implementadas
El sistema cumple con los siguientes requerimientos operativos:
- [x] **Panel Central:** Visualización de registros agrupados en una tabla de gestión responsiva.
- [x] **Operaciones CRUD:** Capacidad para Agregar, Actualizar y Eliminar contactos.
- [x] **Ventanas Modales:** Uso de componentes nativos de Bootstrap para mantener al usuario en una sola página (Single Page Application UX).
- [x] **Seguridad de Borrado:** Confirmación explícita antes de ejecutar la acción de eliminar un registro para evitar pérdida de datos accidental.
- [x] **Identidad Visual:** Favicon implementado, Navbar superior y Footer institucional con datos del desarrollador.
- [x] **Arquitectura de Software:** Código dividido en módulos lógicos (API Request Manager y UI DOM Manipulator).

---

## 📁 Estructura del Front-end

```text
📦 frontend-contactos
 ┣ 📂 assets
 ┃ ┣ 📂 css
 ┃ ┃ ┗ 📜 styles.css       # Reglas de estilo personalizadas (Dark Theme)
 ┃ ┣ 📂 img
 ┃ ┃ ┗ 📜 favicon.png      # Ícono de la pestaña del navegador
 ┃ ┗ 📂 js
 ┃   ┣ 📜 api.js           # Clase encargada de las peticiones fetch al Back-end
 ┃   ┣ 📜 main.js          # Orquestador principal y manejador de eventos
 ┃   ┗ 📜 ui.js            # Clase encargada de renderizar el DOM y las alertas
 ┣ 📜 index.html           # Estructura principal y plantillas de modales
 ┗ 📜 README.md            # Documentación del proyecto