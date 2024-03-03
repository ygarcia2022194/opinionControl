import mongoose from 'mongoose';

const PublicacionSchema = mongoose.Schema({
    titulo:{
        type:String,
        required: true
    },
    categoria:{
        type:String,
        required: true
    },
    texto:{
        type: String,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comentarios:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentario'
    }]
});

export default mongoose.model('Publicacion', PublicacionSchema);