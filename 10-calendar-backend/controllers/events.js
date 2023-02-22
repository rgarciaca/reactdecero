const response = require('express');

const Evento = require('../models/Evento');

const getEventos = async (req, res = response ) => {
    try {

        const eventos = await Evento.find()
                                    .populate('user', 'name');

        return res.status(200).json({
            ok: true,
            eventos
        });

    } catch(error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en la grabación, hable con al administrador'
        })
    }
}

const createEvento = async (req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        const eventoDB = await evento.save();

        return res.status(200).json({
            ok: true,
            evento: eventoDB
        });

    } catch(error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en la grabación, hable con al administrador'
        })
    }
}

const updateEvento = async (req, res = response ) => {

    try {
        const eventoId = req.params.id;
        const uid = req.uid;
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: `El evento no existe con Id: ${ eventoId }`
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status( 401 ).json({
                ok: false,
                msg: `No esta autorizado para modificar esta información`
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoDB = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        return res.status(200).json({
            ok: true,
            evento: eventoDB
        });

    } catch(error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en la grabación, hable con al administrador'
        })
    }
}

const removeEvento = async (req, res = response ) => {

    //const { name, email, password } = req.body;

    try {

        const eventoId = req.params.id;
        const uid = req.uid;
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: `El evento no existe con Id: ${ eventoId }`
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status( 401 ).json({
                ok: false,
                msg: `No esta autorizado para eliminar esta información`
            });
        }

        await Evento.findByIdAndDelete( eventoId );

        return res.status(200).json({
            ok: true,
            msg: 'removeEvento'
        });

    } catch(error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en la grabación, hable con al administrador'
        })
    }
}


module.exports = {
    getEventos,
    createEvento,
    updateEvento,
    removeEvento
}