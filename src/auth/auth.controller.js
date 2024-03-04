import bcryptjs from 'bcryptjs';
import User from '../users/user.js';
import {generarJWT} from '../helpers/generate-jwt.js';
import { generateKey } from 'crypto';

export const login = async (req, res)=>{
    const {usuario, password} = req.body;
    try {
        const user = await User.findOne({$or: [{correo: usuario}, {username: usuario}]});

        if(!user){
            return res.status(400).json({
                msg: "Las credenciales son incorrectas, el correo electronico o el usuario no existe"
            })
        }
        if(!user.estado){
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            })
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }
        const token = await generarJWT(user.id);
        res.status(200).json({
            msg: "Inicio de sesion exitoso",
            usuario: user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contacta al admin"
        })
    }
}