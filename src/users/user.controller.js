import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';


export const usuariosPost = async (req, res) => {


    const {nombre, correo, username,password} = req.body;
    const usuario = new User( {nombre, correo, username,password} );

    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuariosGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, correo, passwordAnterior, ...resto} = req.body;
    const usuarioAutenticado = req.usuario; // Asumiendo que el usuario autenticado está disponible en req.usuario

    try {
        const usuario = await User.findById(id);

        if (!usuario) {
            return res.status(404).json({ msg: 'the user don´t exist' });
        }

        if (usuarioAutenticado._id.toString() !== usuario._id.toString()) {
            return res.status(403).json({ msg: 'You don´t have access to update this user' });
        }

        const passwordValida = await bcryptjs.compare(passwordAnterior, usuario.password);

        if(!passwordValida){
            return res.status(401).json({ msg: "Incorrect old password" });
        }

        if(resto.password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(resto.password, salt);
        }

        await User.findByIdAndUpdate(id, resto);

        const usuarioActualizado = await User.findById(id);

        res.status(200).json({
            msg: 'User Update',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error('ERROR to update user:', error);
        res.status(500).json({ error: 'ERROR to update user' });
    }
}