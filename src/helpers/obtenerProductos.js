const obtenerProductos = {
            
    select: {
        id_producto: true,
        nombre: true,
        precio: true,
        cantidad_en_stock: true,
        marcas: {
            select: {
                nombre: true
            }
        }
    }
}

export {
    obtenerProductos
}