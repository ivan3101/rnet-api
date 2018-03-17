const Mongoose = require('mongoose');
const commentSchema = new Mongoose.Schema({
    'author': {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    'comment': {
        type: String,
        required: [true, 'El cuerpo del comentario es requerido']
    },
    'date': {
        type: Date,
        required: [true, 'La fecha de creación del comentario es requerida']
    },
    'isActive': {
        type: Boolean,
        default: true
    }
});

commentSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    delete obj.isActive;
    return obj;
};

module.exports = Mongoose.model('Comment', commentSchema);