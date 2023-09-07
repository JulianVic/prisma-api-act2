import { PrismaClient } from '@prisma/client'
import { formatearProductos, queryProductosVendidos } from '../helpers/formatearProductos.js';
import { mejoresClientes } from '../helpers/mejoresClientes.js';
import { obtenerProductos as getProductos } from '../helpers/obtenerProductos.js';

const prisma = new  PrismaClient();

const getVentas = async(req, res) => {

    try {

        const productos = await prisma.ventas.findMany(queryProductosVendidos)
        const productos_formateados = formatearProductos(productos);

        return res.json(productos_formateados);
 
    } catch (error) {
        console.log(error)
    }
   
    
}

const mejorComprador = async (req, res) => {
    
        try {
            const resultados = await mejoresClientes();
            return res.json(resultados);
            
        } catch (error) {
            console.log(error)
        }
        
}

const obtenerProductos = async (req,res) => {
    try {
        const productos = await prisma.productos.findMany(getProductos)

        return res.status(200).json(productos)

    } catch (error) {
        console.log(error)
        return res.status(400).json({error: 'hubo un error'})
    }
}

const crearProducto = async (req, res) => {
    const { nombre, precio, cantidad_en_stock, marca_id } = req.body;

  
    try {

        const nuevoProducto = await prisma.productos.create({
            data: {
                nombre,
                precio,
                cantidad_en_stock, 
                marca_id
            }
        })

        return res.status(200).json(
            {
                msg: 'Producto creado exitosamente',
                nuevoProducto
            })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: 'hubo un error'})
    }
}

const actualizarProducto = async (req, res) => {
    const { nombre, precio, cantidad_en_stock, marca } = req.body;
    const { id } = req.params
    try {
        const marcaEncontrada = await prisma.marcas.findFirst({
            where: {
                nombre: marca
            }
        })

        const productoActualizado = await prisma.productos.update({
            where: {
                id_producto: Number(id)
            },
            data: {
                nombre,
                precio,
                cantidad_en_stock,
                marca_id: marcaEncontrada.id
            }
        })

        return res.status(200).json({msg: 'Producto actualizado',productoActualizado})
    } catch (error) {
        console.log(error)
    }
}

const borrarProducto = async (req, res) => {
    const { id } = req.params

   try {
    const productoEliminado = await prisma.productos.delete({
        where : {
            id_producto: Number(id)
        }
    })

    return res.status(200).json({msg: "producto eliminado", productoEliminado})
    
   } catch (error) {
        console.log(error)
   }



}

const obtenerProducto = async (req, res) => {
    const { id } = req.params

    try {
        const productoEncontrado = await prisma.productos.findFirst({
            where: {
                id_producto: Number(id)
            }
        })
    
        return res.status(200).json({productoEncontrado})    
    } catch (error) {
        console.log(error)
    }
}

export default {
    getVentas,
    mejorComprador,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
    obtenerProducto
}
