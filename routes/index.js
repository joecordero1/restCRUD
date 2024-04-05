const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Aquí defines las rutas de tu API.
module.exports = function() {
    // Agrega una nueva ruta para crear un cliente.
    router.post('/clientes', clienteController.nuevoCliente);

    router.get('/clientes', clienteController.mostrarClientes);

    router.get('/clientes/:_id', clienteController.mostrarClienteID);

    router.put('/clientes/:_id', clienteController.updateCliente);

    router.delete('/clientes/:_id', clienteController.deleteCliente);

    return router;
}
