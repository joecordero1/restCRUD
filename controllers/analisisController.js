const Intervencion = require('../models/Intervencion');

// Datos ficticios de la ciudad vecina
const datosCiudadVecina = {
    2021: 10,
    2022: 20,
    2023: 39,
    2024: 50
};

// Función para calcular mejoras por periodo
async function calcularMejorasPorPeriodo(animalId, fechaInicio, fechaFin) {
    const intervenciones = await Intervencion.find({
        Id_Animal: animalId,
        fecha: { $gte: fechaInicio, $lte: fechaFin }
    }).sort('fecha');

    let totalMejora = 0;
    intervenciones.forEach(intervencion => {
        totalMejora += intervencion.resultadoDespues - intervencion.resultadoAntes;
    });

    return totalMejora;
}

// Función para comparar con la ciudad vecina
async function compararConCiudadVecina(animalId, ano) {
    const fechaInicio = new Date(`${ano}-01-01`);
    const fechaFin = new Date(`${ano}-12-31`);

    const mejoraLocal = await calcularMejorasPorPeriodo(animalId, fechaInicio, fechaFin);
    const mejoraVecina = datosCiudadVecina[ano] || 0;

    return {
        mejoraLocal,
        mejoraVecina,
        porcentajeAlcanzado: (mejoraLocal / mejoraVecina * 100).toFixed(2) + '%',
        faltanteParaAlcanzar: mejoraVecina - mejoraLocal
    };
}

// Calcular mejoras anuales para todos los animales
async function calcularMejorasAnuales(inicio, fin) {
    try {
        console.log(`Calculando mejoras anuales desde ${inicio} hasta ${fin}`);
        const intervenciones = await Intervencion.find({
            fecha: { $gte: inicio, $lte: fin }
        });

        console.log(`Intervenciones encontradas: ${intervenciones.length}`);

        const totalMejora = intervenciones.reduce((acc, intervencion) => {
            return acc + (intervencion.resultadoDespues - intervencion.resultadoAntes);
        }, 0);

        console.log(`Total mejora calculada: ${totalMejora}`);

        return { totalMejora };
    } catch (error) {
        console.error('Error calculando mejoras anuales:', error);
        throw error;
    }
}

// Comparar mejoras anuales con datos de la ciudad vecina
async function compararMejorasCiudadVecina(ano) {
    try {
        const inicio = new Date(`${ano}-01-01`);
        const fin = new Date(`${ano}-12-31`);

        console.log(`Comparando mejoras anuales desde ${inicio} hasta ${fin}`);

        const intervenciones = await Intervencion.find({
            fecha: { $gte: inicio, $lte: fin }
        });

        console.log(`Intervenciones encontradas: ${intervenciones.length}`);

        const totalMejora = intervenciones.reduce((acc, intervencion) => {
            return acc + (intervencion.resultadoDespues - intervencion.resultadoAntes);
        }, 0);

        console.log(`Total mejora calculada: ${totalMejora}`);

        const mejoraVecina = datosCiudadVecina[ano] || 100;

        const porcentajeAlcanzado = (totalMejora / mejoraVecina) * 100;
        const faltanteParaAlcanzar = mejoraVecina - totalMejora;

        console.log(`Mejora vecina: ${mejoraVecina}, Porcentaje alcanzado: ${porcentajeAlcanzado}, Faltante para alcanzar: ${faltanteParaAlcanzar}`);

        return { totalMejora, mejoraVecina, porcentajeAlcanzado, faltanteParaAlcanzar };
    } catch (error) {
        console.error('Error comparando mejoras anuales con ciudad vecina:', error);
        throw error;
    }
}

module.exports = {
    calcularMejorasPorPeriodo,
    compararConCiudadVecina,
    calcularMejorasAnuales,
    compararMejorasCiudadVecina
};
