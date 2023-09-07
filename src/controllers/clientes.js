import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const getClientes = async(req, res) => {
    try {
        const clientes = await prisma.clientes.findMany({
            orderBy: [
                {
                    created_At: 'asc'
                }
            ]
         })

        return res.status(200).json({clientes})
    } catch (error) {
        console.log(error)
    }
}

const crearCliente = async (req, res) => {
    const { nombre, apellidos, email } = req.body

    try {
        const nuevoCliente = await prisma.clientes.create({
            data: {
                nombre,
                apellidos,
                email
            }
        })

        return res.status(200).json({nuevoCliente})
        
    } catch (error) {
        console.log(error)
    }
}

const acutalizarCliente = async (req, res) => {
    const { id } = req.params
    const { nombre, apellidos, email} = req.body

    try {
        const cliente = await prisma.clientes.update({
            where : {
                id : Number(id)
            }, data : {
                nombre,
                apellidos,
                email
            }
        })
        return res.status(200).json({cliente})
    } catch (error) {
        console.log(error)
        
    }
}
const eliminarCliente = async (req, res) => {
    const {id} = req.params

    try {
        const cliente = await prisma.clientes.delete({
            where : {
                id : Number(id)
            }
        })
        return res.status(200).json({msg: "Cliente eliminado", cliente})
    } catch (error) {
        console.log(error)
        
    }
    
}
const encontrarCliente = async (req, res) => {
    const { id } = req.params
    try {
        const cliente = await prisma.clientes.findFirst({
            where : {
                id : Number(id)
            }
        })
        return res.status(200).json({cliente})
    } catch (error) {
     console.log(error)   
    }

}

export default {
    getClientes,
    crearCliente,
    acutalizarCliente,
    eliminarCliente,
    encontrarCliente
}