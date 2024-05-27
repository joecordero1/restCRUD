const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const usuariosController = require('../controllers/usuariosController');
const razaController = require('../controllers/razaController');
const tipoAnimalController = require('../controllers/tipoAnimalController');
const sexoController = require('../controllers/sexoController');
const estadoAnimalController = require('../controllers/estadoAnimalController');
const intervencionController = require('../controllers/intervencionController');
//const detalleEstadoController = require('../controllers/detalleEstadoController');
const saludAnimalController = require('../controllers/saludAnimalController');
const analisisController = require('../controllers/analisisController'); // analisis controlador

// Middleware para proteger las rutas
const auth = require('../middleware/auth');

// Aquí defines las rutas de tu API.
module.exports = function() {
    // Rutas para animales
    router.post('/animales', auth, animalController.nuevoAnimal);
    router.post('/animales/anadir-estado/:_id', auth, animalController.agregarEstadoAnimal);
    router.post('/animales/anadir-intervencion/:_id', auth, animalController.agregarIntervencion);
    router.get('/animales', animalController.mostrarAnimales);
    router.get('/animales/:_id', animalController.mostrarAnimalPorId);
    router.put('/animales/:_id', auth, animalController.actualizarAnimal);
    router.delete('/animales/:_id', auth, animalController.eliminarAnimal);

    // Rutas para razas
    router.post('/razas', razaController.nuevaRaza);
    router.get('/razas', razaController.mostrarRazas);
    router.get('/razas/:_id', auth, razaController.mostrarRazaPorId);
    router.put('/razas/:_id', auth, razaController.actualizarRaza);
    router.delete('/razas/:_id', auth, razaController.eliminarRaza);

    // Rutas para tipos de animales
    router.post('/tipos-animal', tipoAnimalController.nuevoTipoAnimal);
    router.get('/tipos-animal', tipoAnimalController.mostrarTiposAnimal);
    router.get('/tipos-animal/:_id', auth, tipoAnimalController.mostrarTipoAnimalPorId);
    router.put('/tipos-animal/:_id', auth, tipoAnimalController.actualizarTipoAnimal);
    router.delete('/tipos-animal/:_id', auth, tipoAnimalController.eliminarTipoAnimal);

    // Rutas para sexos
    router.post('/sexos', sexoController.nuevoSexo);
    router.get('/sexos', sexoController.mostrarTiposSexo);
    router.get('/sexos/:_id', auth, sexoController.mostrarSexoPorId);
    router.put('/sexos/:_id', auth, sexoController.actualizarSexo);
    router.delete('/sexos/:_id', auth, sexoController.eliminarSexo);

    // Rutas para estados de animales
    router.post('/estados-animal', estadoAnimalController.nuevoEstadoAnimal);
    router.get('/estados-animal', estadoAnimalController.mostrarEstadosAnimal);
    router.get('/estados-animal/:_id', estadoAnimalController.mostrarEstadoAnimalPorId);
    router.put('/estados-animal/:_id', auth, estadoAnimalController.actualizarEstadoAnimal);
    router.delete('/estados-animal/:_id', auth, estadoAnimalController.eliminarEstadoAnimal);

    /* Rutas para detalles de estado
    router.post('/detalles-estado', detalleEstadoController.nuevoDetalleEstado);
    router.get('/detalles-estado', detalleEstadoController.mostrarDetallesEstado);
    router.get('/detalles-estado/:_id', auth, detalleEstadoController.mostrarDetalleEstadoPorId);
    router.put('/detalles-estado/:_id', auth, detalleEstadoController.actualizarDetalleEstado);
    router.delete('/detalles-estado/:_id', auth, detalleEstadoController.eliminarDetalleEstado);
    */

    // Rutas para salud de animales
    router.post('/salud-animal', saludAnimalController.nuevaSaludAnimal);
    router.get('/salud-animal', saludAnimalController.mostrarSaludAnimal);
    router.get('/salud-animal/:_id', auth, saludAnimalController.mostrarSaludAnimalPorId);
    router.put('/salud-animal/:_id', auth, saludAnimalController.actualizarSaludAnimal);
    router.delete('/salud-animal/:_id', auth, saludAnimalController.eliminarSaludAnimal);

    // Rutas para usuarios
    router.post('/crear-cuenta', usuariosController.registrarUsuario);
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);
    router.get('/usuarios', usuariosController.mostrarUsuarios);

    // Rutas para intervenciones
    router.post('/intervenciones', intervencionController.nuevaIntervencion);
    router.get('/intervenciones', intervencionController.obtenerIntervenciones);
    router.get('/intervenciones/:id', auth, intervencionController.obtenerIntervencionPorId);
    router.put('/intervenciones/:id', auth, intervencionController.actualizarIntervencion);
    router.delete('/intervenciones/:id', auth, intervencionController.eliminarIntervencion);

    // Rutas para análisis
    router.get('/analisis/mejoras/:fechaInicio/:fechaFin', async (req, res) => {
        const { fechaInicio, fechaFin } = req.params;
        try {
            const mejoras = await analisisController.calcularMejorasAnuales(new Date(fechaInicio), new Date(fechaFin));
            res.json(mejoras);
        } catch (error) {
            console.error('Error en la ruta /analisis/mejoras:', error);
            res.status(500).json({ mensaje: 'Hubo un error al calcular las mejoras anuales' });
        }
    });

    router.get('/analisis/comparacion/:ano', async (req, res) => {
        const { ano } = req.params;
        try {
            const comparacion = await analisisController.compararMejorasCiudadVecina(parseInt(ano));
            res.json(comparacion);
        } catch (error) {
            console.error('Error en la ruta /analisis/comparacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al comparar las mejoras anuales con la ciudad vecina' });
        }
    });




    return router;
}
