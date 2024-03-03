import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "The name is obligatory"],
    },
    correo: {
        type: String,
        required:[true, "The email is obligatory"],
        unique: true
    },
    username:{
        type: String,
        required: [true, "The username is obligatory"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "The password is obligatory"]
    }
});

UserSchema.methods.toJSON =function(){
    const {__v, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema);