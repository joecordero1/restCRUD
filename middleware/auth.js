const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado, no JWT');
        error.statusCode = 401;
        throw error;
    }


    //obtener el token
    const token = authHeader.split(' ')[1]; // Espacio en split

    let revisarToken;
    try{
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch(error){
        error.statusCode = 500;
        throw error;
    }
    
    //SI ES TOKEN VALIDO, PERO HAY ALGUN ERROR
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }
    next();
}