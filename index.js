
import express from 'express'
import productosRouter from './src/routes/productos.js'
import clientesRouter from './src/routes/clientes.js'
const app = express()
const puerto = process.env.PORT || 4000

app.use(express.json())

app.use('/api/productos', productosRouter)
app.use('/api/clientes', clientesRouter)

app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto', puerto)
})

