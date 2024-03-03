import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "The name is obligatory"],
  },
  correo: {
    type: String,
    required: [true, "The email is obligatory"],
    unique: true,
},
  username:{
    type: String,
    required: [true, "The email is obligatory"],
    unique: true,
},
  password: {
    type: String,
    required: [true, "The password is obligatory"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function(){
  const { __v, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
}

export default mongoose.model('User', UserSchema);