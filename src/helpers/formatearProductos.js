function formatearProductos (productos) {

    let productosformateados = productos.map( producto => {
        const fecha = producto.created_at 

        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric'}

        const fecha_formateada = fecha.toLocaleDateString('es-ES', opcionesFecha)

        producto.created_at = fecha_formateada

        const opcionesHora = { hour: 'numeric', minute: 'numeric'}

        const hora = fecha.toLocaleTimeString('es-ES', opcionesHora)

        producto.hora = hora

        return producto

    })

    return productosformateados
}

const queryProductosVendidos = {

    select: {
        id: true,
        clientes:{
            select: {
                nombre: true,
                apellidos: true
            }
        },
        productos: {
            select: {
                nombre: true,
                marcas: {
                    select: {
                        nombre: true
                    }
                }
            }
        },
        cantidad: true,
        total: true,
        created_at: true
    },
    orderBy: [
        {
            created_at: 'desc'
        }

    ]

}

export {
    formatearProductos,
    queryProductosVendidos
}