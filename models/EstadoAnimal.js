const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleEstadoSchema = new Schema({
    clave: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    }
});

const estadoAnimalSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    detalles: [detalleEstadoSchema]
});

module.exports = mongoose.model('EstadoAnimal', estadoAnimalSchema);
