import User from '../users/user.model.js';

export  const existEmails = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} already registered`);
    }
}

export const existUsernames = async (username = '') => {
    const existUsername = await User.findOne({username});
    if(existUsername){
        throw new Error(`The username ${username} already registered`)
    }
}

export  const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The id: ${email} don't exist`)
    }
}

