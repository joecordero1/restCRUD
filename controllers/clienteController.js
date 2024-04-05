const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res) => {
    // Instanciar un objeto Cliente con los datos de req.body
    const cliente = new Clientes(req.body);

    try {
        // Guardar el cliente en la base de datos
        await cliente.save();
        res.json({ mensaje: 'Se agregó un nuevo cliente' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
