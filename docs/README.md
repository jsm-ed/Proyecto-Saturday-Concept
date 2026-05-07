#  Proyecto Saturday Concept

![Portada del Proyecto](../web-SaturdayConcept/img/principal1.png)

---

##  Índice de Contenidos

1. [Descripción del Proyecto](#1-descripción-del-proyecto)
2. [Análisis de Requisitos a Desarrollar](#2-análisis-de-requisitos-a-desarrollar)
3. [Tecnologías y Justificación](#3-tecnologías-y-justificación)
4. [Diseño de la Persistencia de Datos](#4-diseño-de-la-persistencia-de-datos)
5. [Pasos Principales del Desarrollo](#5-pasos-principales-del-desarrollo)
   - 5.1 [Configuración del Entorno](#51-configuración-del-entorno)
   - 5.2 [Backend: Modelos, Controladores y Rutas](#52-backend-modelos-controladores-y-rutas)
   - 5.3 [Frontend: Vistas y Funcionalidades](#53-frontend-vistas-y-funcionalidades)
6. [Conclusión](#10-conclusión)

---

## 1. Descripción del Proyecto

**Motivación:**  
La motivación principal de desarrollar este proyecto fue la temática y estética de la web [Saturday Concept](https://saturdayconcept.com/) y la posible simplicidad que tendría la web al ser de una pequeña tienda de streetwear.

**Objetivo Principal:**  
Crear una tienda web funcional que permita a los usuarios navegar por un catálogo de productos de streetwear, gestionar un carrito de compras y completar un formulario de pago. Además de, proporcionar un panel de administración (SPA) para la gestión del inventario y pedidos y clientes.

**Necesidades que cubre:**
- **Para el usuario:** Una interfaz intuitiva, catálogo dinámico, carrito persistente en el almacenamiento local y un proceso de pago claro con validación de datos.
- **Para el administrador:** Un panel (`adm-SaturdayConcept`) que permite gestionar productos, actualizar el stock, asignar tallas y gestionar las ventas sin tener que modificar la base de datos manualmente.

---

## 2. Análisis de requisitos a desarrollar
- **Catálogo de productos:** Visualización de productos obtenidos desde una API REST.
- **Carrito de compras:** Añadir, eliminar y modificar cantidades de productos. Cálculo automático de totales.
- **Pasarela de Checkout (`payment.html`, `payment.js`):** Formulario de recopilación de datos del cliente y dirección. Validación mediante expresiones regulares.
- **Gestión de Pedidos:** Creación de clientes y direcciones evitando duplicados (`findOrCreate`), registro de la orden y actualización automática del inventario (reducción de stock al comprar).
- **Panel de Administración:** SPA para gestionar las operaciones CRUD de Productos, Marcas, Tallas e Inventario.

---

## 3. Tecnologías y Justificación 

### Frontend
- **HTML5 y CSS3 (Vanilla):** Para la estructuración y estilización. Se optó por CSS nativo para tener un control absoluto sobre el diseño, y así, poder replicar Saturday Concept lo más parecido posible sin depender de frameworks.
- **Vanilla JS:** Utilizado para toda la lógica de interacción, consumo de API (Fetch y librería JSON), manejo del DOM, mantenimiento de datos en Local Storage y validaciones con regex.
- **Node.js v24.11:** Como entorno de ejecución para facilitar el desarrollo y pruebas del frontend durante la creación del proyecto.
- **Font awesome v6.7.2** 
- **Google Fonts** Para incorporar tipografías web personalizadas y mejorar la apariencia visual de la aplicación

### Backend
- **Antigravity:** Como herramienta de apoyo en el desarrollo del backend y del backoffice, ya que permite generar estructuras de código y funcionalidades iniciales a partir de agentes de IA. Esto ha facilitado la creación de una base de trabajo en un contexto de aprendizaje, acelerando el desarrollo y ayudando a comprender la estructura general del backend.
- **PHP 8+ con Laravel 11:** Como framework principal del backend, debido a que su arquitectura MVC<sup>1</sup> y su estructura bien definida facilitan el desarrollo asistido por inteligencia artificial.
- **XAMPP:** Ya que permite simular un servidor completo con Apache, MySQL y PHP de forma sencilla. Esto facilita el desarrollo y las pruebas de la aplicación sin necesidad de un servidor en producción.

#### Github: 
- Como sistema de control de versiones, permitiendo gestionar el código del proyecto, mantener un historial de cambios y facilitar el trabajo entre distintos dispositivos.


<span style="font-size: 12px;">1*(Modelo–Vista–Controlador), que permite una organización clara del código y facilita su mantenimiento, escalabilidad</span>
---

## 4. Diseño de la Persistencia de Datos

![Modelo Relacional](./img-md/Relacional%20SaturdayConcept.png)
---

## 5. Pasos Principales del Desarrollo
### 5.1. Configuración del Entorno
- Servidor de base de datos (MySQL (XAMPP))
- Navegador web y un servidor local estático (ej. Live Server en VSCode)

**Pasos para desplegar en local:**
1. **Clonar el repositorio.**
2. **Base de Datos:**
   - Abre phpMyAdmin (XAMPP).
   - Crea una base de datos nueva (ej. `saturday_concept`).
   - Importa el archivo `.sql` que se encuentra en la carpeta `docs` dentro de esa base de datos.
3. **Despliegue del Backend:**
   ```bash
   cd api-SaturdayConcept
   cp .env.example .env
   # Configurar las credenciales de la BD (nombre de la base de datos que acabas de crear) en el archivo .env
   composer install
   php artisan key:generate
   php artisan serve
   ```
   *(La API correrá por defecto en `http://127.0.0.1:8000`)*
3. **Despliegue del Frontend:**
   Levantar `web-SaturdayConcept` y `adm-SaturdayConcept` mediante un servidor local como Live Server.

---

### 5.2. Backend: Modelos, Controladores y Rutas

- **Modelos Principales:** 
  `Product`, `Order`, `Customer`, `Address`, `OrderItem`, `Size`, `Brand`. Contienen las definiciones de relaciones complejas.
- **Controladores Clave:** 
  - `ProductController`: Gestiona la entrega de datos del catálogo. Se ajustó para que la estructura de respuesta JSON encaje perfectamente con lo que esperaba el frontend.
  - `OrderController`: Recibe el payload del checkout. Coordina la creación del cliente/dirección, genera la orden, crea los ítems correspondientes y realiza el descuento del stock.
- **Rutas Principales (Entrypoints):**
  - `GET /api/products`: Obtiene el catálogo completo.
  - `POST /api/orders`: Endpoint crítico para el procesamiento del pago.
  - Endpoints CRUD para el panel de administración (`PUT /api/products/{id}`, etc).

---

### 5.3. Frontend: Vistas y Funcionalidades

- **Vistas Públicas:**
  - **`index.html`:** Página de inicio con la carga dinámica de productos desde la API.
  - **`payment.html`:** Formulario de recogida de datos del usuario (nombre, email, teléfono, dirección) y resumen final del pedido.
- **Componentes Lógicos:**
  - **`app.js`:** Núcleo de la tienda. Gestiona el renderizado del catálogo, el estado del carrito (en LocalStorage) y los eventos generales.
  - **`payment.js`:** Se encarga exclusivamente del flujo de pago. Realiza la validación de campos (mostrando "Campo inválido" con bordes rojos en inputs erróneos) y construye el payload simplificado que se envía a la API mediante `fetch`.
- **Vista de Administración:** SPA diseñada para consumir los endpoints CRUD, manejando el desempaquetado automático de respuestas JSON y permitiendo, por ejemplo, actualizar las tallas de un producto con peticiones limpias a la API.

---

## 6. Conclusión

**Problemas encontrados y soluciones:**
- **Inconsistencia en el formato de datos de la API:** Inicialmente, el frontend utilizaba un archivo `data/products.JSON`. Al migrar a la API, la estructura no coincidía. *Solución:* Modificar el `ProductController` de Laravel para transformar las colecciones de Eloquent y mapearlas al formato esperado.
**Aportaciones a nivel personal:**
*(Añade aquí tu experiencia personal: qué parte representó un mayor desafío, qué has aprendido acerca de la interacción Frontend-Backend, tu mejora y soltura escribiendo código JavaScript o tu entendimiento de Laravel...)*

**Mejoras que añadiría (Futuro):**
- **Autenticación de Usuarios:** Implementar un sistema de Login/Registro para que los clientes puedan acceder a su historial de compras.
- **Pasarela de pago real:** Integrar el frontend con plataformas como Stripe o PayPal en lugar de simular la transacción final.
- **Notificaciones:** Envío automático de un email al cliente con el resumen de su pedido al completar el pago.

---
*Juan Sastre Montero  -  Proyecto para 1ºGS ASIR.*
