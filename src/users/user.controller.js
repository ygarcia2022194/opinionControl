import {response, request} from "express";
import bcryptjs from 'bcryptjs';
import User from './user.js';

export const userPost = async (req, res)=>{
    const {nombre, correo, username,password} = req.body;
    const user = new User( {nombre, correo, username,password} );

    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);


    await user.save();

    res.status(200).json({
        user
    });
}

export const userGet = async (req = request, res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        user
    });
}

export const userPut = async(req, res= response)=>{
    const {id} = req.params;
    const {_id, correo, oldPassword, ...resto} = req.body;
    const autenticUser = req.user;

    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                msg: 'the user don´t exist'
            })
        }
        if (autenticUser._id.toString() !== user._id.toString()) {
            return res.status(403).json({ 
                msg: 'You don´t have access to update this user' 
            });
        }

        const validPassword = await bcryptjs.compare(oldPassword, user.password);

        if(!validPassword){
            return res.status(401).json({ 
                msg: "Incorrect old password" 
            });
        }

        if(resto.password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(resto.password, salt);
        }
        await User.findByIdAndUpdate(id, resto);

        const UpdateUser = await User.findById(id);

        res.status(200).json({
            msg: 'User Update',
            user: UpdateUser
        });
    } catch (error){
        console.error('ERROR to update user', error);
        res.status(500).json({error: 'ERROR to update user'});
    }
}