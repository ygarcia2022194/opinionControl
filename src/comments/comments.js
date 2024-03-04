import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    contenido:{
        type:String,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publication:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
});

export default mongoose.model('Comment', CommentSchema);