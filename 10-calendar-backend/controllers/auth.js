const response = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response ) => {

    const { name, email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }

        usuario = new  Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync( );
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name);
        return res.status( 201 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch(error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en la grabación, hable con al administrador'
        })
    }
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return  res.status(401).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            });
        };

        // Confirmar las passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        };

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name);
        return res.status( 200 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch(error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el login, hable con al administrador'
        })
    }
}

const revalidarToken = async(req, res = response) => {

    const { uid, name }= req;
    
    // Generar nuestro JWT
    const token = await generarJWT( uid, name);
    return res.status( 200 ).json({
        ok: true,
        uid,
        name,
        token
    });

}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}