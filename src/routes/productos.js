
import { Router } from 'express'
import productosController from '../controllers/productos.js'

const router = Router()

router.get('/ventas', productosController.getVentas)
router.get('/best', productosController.mejorComprador)
router.get('/', productosController.obtenerProductos)
router.post('/', productosController.crearProducto)
router.route('/:id')
.get(productosController.obtenerProducto)
.put(productosController.actualizarProducto)
.delete(productosController.borrarProducto)

export default router
