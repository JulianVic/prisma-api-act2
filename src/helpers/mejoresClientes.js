import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function mejoresClientes () {
    const top5Clientes = await prisma.ventas.groupBy({
        by: ['id_cliente'],
        _sum: {
          total: true,
        },
        orderBy: {
          _sum: {
            total: 'desc',
          },
        },
        take: 5,
      });
      
      // Obtén los nombres de los clientes
      const clientesIds = top5Clientes.map((item) => item.id_cliente);
      const clientesNombres = await prisma.clientes.findMany({
        where: {
          id: {
            in: clientesIds,
          },
        },
        select: {
          id: true,
          nombre: true,
          apellidos: true,
        },
      });
      
      // Combina los resultados de ventas y nombres de clientes
      const resultados = top5Clientes.map((venta) => {
        const cliente = clientesNombres.find((c) => c.id === venta.id_cliente);
        const nombre = cliente ? cliente.nombre : 'Cliente Desconocido';
        const apellidos = cliente ? cliente.apellidos : 'Sin Apellidos';
        
        return {
          id_cliente: venta.id_cliente,
          nombre,
          apellidos,
          total_comprado: venta._sum.total,
        };
      });

      return resultados
}

export { 
    mejoresClientes
}