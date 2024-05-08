const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
    //leer datos de usuario y colocarlo en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje:'Usuario registrado correctamente'});

    } catch (error) {
        console.log(error);
        res.json({mensaje : 'Hubo un error'});
    }

}

exports.autenticarUsuario = async (req, res, next) => {
    //busca el usuario
    const { email, password } = req.body; 
    const usuario = await Usuarios.findOne({ email });

    if(!usuario){
        res.status(401).json({mensaje: 'Ese usuario no existe'});
    } else {
        //aqui el usuario si existe
        if(!bcrypt.compareSync(password, usuario.password)){
            res.status(401).json({mensaje: 'Contraseña incorrecta'});
            next();
        }else{
            //aqui la contraeña es correcta
            //firma el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'LLAVESECRETA',
            {
                expiresIn : '3h'
            });
            //envia el token
            res.json({token});
        }
    }
}