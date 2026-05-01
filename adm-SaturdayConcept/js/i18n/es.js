export const es = {
    nav: { dashboard: 'Panel', products: 'Productos', sections: 'Secciones', orders: 'Pedidos', customers: 'Clientes' },
    actions: { create: 'Crear', edit: 'Editar', delete: 'Eliminar', save: 'Guardar', cancel: 'Cancelar', search: 'Buscar...', confirm: 'Confirmar', view: 'Ver', items: 'Artículos', close: 'Cerrar', add_item: 'Añadir artículo' },
    fields: {
        id: 'ID', name: 'Nombre', price: 'Precio', img: 'Imagen URL', description: 'Descripción',
        section_name: 'Sección', size_name: 'Talla', stock: 'Stock', surnames: 'Apellidos',
        contact: 'Contacto', address_id: 'Dirección', discount: 'Descuento (%)', order_total: 'Total',
        customer_id: 'Cliente', product_id: 'Producto', quantity: 'Cantidad', created_at: 'Fecha'
    },
    messages: {
        created: 'Creado correctamente', updated: 'Actualizado correctamente', deleted: 'Eliminado correctamente',
        error: 'Ha ocurrido un error', confirm_delete: '¿Seguro que deseas eliminar este registro?',
        no_data: 'No hay datos disponibles', loading: 'Cargando...',
        confirm_delete_item: '¿Seguro que deseas eliminar este artículo?'
    },
    pagination: { previous: 'Anterior', next: 'Siguiente', page_of: 'Página {current} de {total}', showing: 'Mostrando {from}-{to} de {total}' },
    dashboard: { title: 'Panel de Control', welcome: 'Bienvenido al panel de administración', total_products: 'Total Productos', total_sections: 'Total Secciones', total_orders: 'Total Pedidos', total_customers: 'Total Clientes' },
    products: { title: 'Productos', create: 'Nuevo Producto', edit: 'Editar Producto', view: 'Detalle de Producto' },
    sections: { title: 'Secciones', create: 'Nueva Sección', edit: 'Editar Sección', view: 'Detalle de Sección' },
    orders: { title: 'Pedidos', create: 'Nuevo Pedido', edit: 'Editar Pedido', view: 'Detalle de Pedido', items_title: 'Artículos del Pedido' },
    customers: { title: 'Clientes', create: 'Nuevo Cliente', edit: 'Editar Cliente', view: 'Detalle de Cliente' },
    sort: { asc: 'Ascendente', desc: 'Descendente', by: 'Ordenar por' },
    filter: { by: 'Filtrar por', all: 'Todos', column: 'Columna', value: 'Valor' },
    lang: { es: 'Español', en: 'Inglés' }
};
