const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Aquí defines las rutas de tu API.
module.exports = function() {
    // Agrega una nueva ruta para crear un cliente.
    router.post('/clientes', clienteController.nuevoCliente);

    // Puedes agregar más rutas aquí.

    return router;
}
