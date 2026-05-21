```markdown
# 🏢 TECNOLÓGICO NACIONAL DE MÉXICO
### Instituto Tecnológico de Pachuca
**Materia:** Programación Web / Desarrollo de Aplicaciones  
**Tema:** Arquitectura Full-Stack y Consumo de APIs REST  
**Programador:** Gael Quiroz Bautista  
**Fecha:** Mayo 2026  

---

# 📇 NEXTCORE // Sistema Centralizado de Gestión de Contactos

## 🚀 Descripción del Proyecto
Este proyecto es una aplicación web de entorno **Full-Stack** diseñada para la gestión integral de agendas telefónicas y directorios. La arquitectura se divide de forma estricta en dos capas:

1. **Back-end (Servidor):** Diseñado bajo el patrón de arquitectura **Modelo-Vista-Controlador (MVC)** en PHP 8, expone una API REST conectada a una base de datos MySQL (`agenda_contactos`). Todas las transacciones críticas se ejecutan mediante **Procedimientos Almacenados (Stored Procedures)** para optimizar el rendimiento y la seguridad. Desplegado públicamente en Hostinger.
2. **Front-end (Cliente):** Una interfaz de usuario moderna con estética industrial/oscura estructurada con **Bootstrap 5**, JavaScript modular nativo (ES6) y **Programación Orientada a Objetos (POO)**. Desplegado en GitHub Pages de forma estática.

---

## 🔗 Enlaces de Producción
* **Front-end (Interfaz GitHub Pages):** `https://nekoxama1204.github.io/frontend-contactos/`
* **Back-end URL Base:** `https://backend.gaelquiroz.online/api-contactos/index.php`

---

## ✨ Características y Reglas de Negocio Implementadas
- **Panel de Control Dinámico:** Carga de registros automatizada en una tabla responsiva mediante solicitudes asíncronas (`fetch`).
- **Control Unificado mediante Ventanas Modales:** Los formularios de inserción y edición se abren mediante componentes modales de Bootstrap para evitar recargas completas de la página, implementando una UX fluida.
- **Flujo de Eliminación Segura:** Confirmación obligatoria integrada en una ventana modal antes de purgar físicamente cualquier índice de la base de datos.
- **Estructura Modular (POO):** Código cliente organizado en clases dedicadas (`ContactoAPI` para peticiones HTTP y `UI` para manipulación del DOM).
- **Detalles Institucionales e Identidad:** Barra de navegación interactiva, favicon corporativo indexado y pie de página con las credenciales completas del desarrollador.

---

## 📁 Estructura del Repositorio (Front-end)
```text
📦 frontend-contactos
 ┣ 📂 assets
 ┃ ┣ 📂 css
 ┃ ┃ ┗ 📜 styles.css       # Estilos personalizados (Dark/Industrial Theme)
 ┃ ┣ 📂 img
 ┃ ┃ ┗ 📜 favicon.png      # Identificador visual de pestaña
 ┃ ┗ 📂 js
 ┃   ┣ 📜 api.js           # Clase ContactoAPI (Gestor de peticiones Fetch)
 ┃   ┣ 📜 main.js          # Orquestador del ciclo de vida y eventos de la app
 ┃   ┗ 📜 ui.js            # Clase UI (Renderizado e interactividad del DOM)
 ┣ 📜 index.html           # Estructura core y plantillas HTML de modales
 ┗ 📜 README.md            # Documentación técnica del sistema

```

---

## 🛠️ Guía de Endpoints de la API REST (Postman Manual)

> ⚠️ **Configuración en Postman:** Para todos los métodos `POST`, `PUT` y `DELETE`, es obligatorio añadir el encabezado `Content-Type: application/json` en la pestaña **Headers**, y enviar las cargas útiles en la pestaña **Body** seleccionando la opción **raw -> JSON**.

### 📥 Consultas (MÉTODO GET)

#### 1. Listar todos los contactos vinculados (con correos y teléfonos)

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=contactos-completos`
* **Descripción:** Ejecuta una vista relacional compleja que extrae los datos nucleares del contacto junto a todas sus vías de comunicación enlazadas.

#### 2. Extraer teléfonos principales

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=telefonos-principales`
* **Descripción:** Filtra únicamente las líneas telefónicas asignadas como prioritarias (`es_principal = 1`).

#### 3. Estadísticas de registros por categoría

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=contactos-por-categoria`
* **Descripción:** Retorna el conteo total acumulado de contactos clasificados en cada categoría del sistema.

#### 4. Filtrar búsquedas por categoría específica

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=buscar-categoria&categoria=Escuela`
* **Parámetros:** Cambiar el valor de `categoria` en la URL (*Familia, Trabajo, Escuela, Amigos, Clientes, Alumnos*).

#### 5. Historial de registros recientes

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=contactos-recientes&limite=5`
* **Parámetros:** El argumento `limite` define el tamaño de la matriz de retorno (orden cronológico inverso).

---

### 📤 Inserciones (MÉTODO POST)

#### 1. Registro integrado de contacto completo

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=agregar-contacto-completo`
* **Body (JSON):**

```json
{
  "nombre": "Carlos Alberto",
  "apellido": "Martínez",
  "fecha_nacimiento": "2002-08-14",
  "id_categoria": 3,
  "telefono": "7712224466",
  "correo": "carlos.mtz@escuela.edu.mx"
}

```

#### 2. Alta de nueva categoría

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=agregar-categoria`
* **Body (JSON):**

```json
{
  "nombre_categoria": "Gimnasio",
  "descripcion": "Contactos relacionados al centro de entrenamiento"
}

```

#### 3. Registro aislado de contacto base

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=agregar-contacto`
* **Body (JSON):**

```json
{
  "nombre": "Diana",
  "apellido": "Soto",
  "fecha_nacimiento": "1999-12-05",
  "id_categoria": 4
}

```

#### 4. Añadir canal de comunicación adicional

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=agregar-dato-contacto`
* **Body (JSON):**

```json
{
  "id_contacto": 1,
  "tipo_dato": "Teléfono",
  "valor": "7719998877",
  "es_principal": false
}

```

---

### 🔄 Modificaciones (MÉTODO PUT)

#### 1. Actualizar entidad del contacto

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=actualizar-contacto`
* **Body (JSON):**

```json
{
  "id_contacto": 1,
  "nombre": "Juan Carlos",
  "apellido": "Pérez Solares",
  "fecha_nacimiento": "1990-05-12",
  "id_categoria": 1
}

```

#### 2. Actualizar metadatos de categoría

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=actualizar-categoria`
* **Body (JSON):**

```json
{
  "id_categoria": 1,
  "nombre_categoria": "Familia Directa",
  "descripcion": "Núcleo familiar inmediato"
}

```

#### 3. Modificar canal de comunicación específico

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=actualizar-dato-contacto`
* **Body (JSON):**

```json
{
  "id_dato": 1,
  "tipo_dato": "Teléfono",
  "valor": "7711234567",
  "es_principal": true
}

```

---

### 🗑️ Eliminaciones (MÉTODO DELETE)

#### 1. Eliminación de contacto (Cascada integrada)

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=eliminar-contacto`
* **Body (JSON):**

```json
{
  "id_contacto": 3
}

```

#### 2. Purgar canal de comunicación

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=eliminar-dato-contacto`
* **Body (JSON):**

```json
{
  "id_dato": 6
}

```

#### 3. Remover categoría

* **Endpoint:** `https://backend.gaelquiroz.online/api-contactos/index.php?accion=eliminar-categoria`
* **Body (JSON):**

```json
{
  "id_categoria": 5
}

```

