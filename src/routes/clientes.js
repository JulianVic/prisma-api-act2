import { Router } from 'express'
import clientesController from '../controllers/clientes.js'

const router = Router()

router.get('/', clientesController.getClientes)
router.post('/', clientesController.crearCliente)
router.route('/:id')
.get(clientesController.encontrarCliente)
.put(clientesController.acutalizarCliente)
.delete(clientesController.eliminarCliente)

export default router