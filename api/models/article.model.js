const Mongoose = require('mongoose');
const articleSchema = new Mongoose.Schema({
    'title': {
        type: String,
        required: [true, 'El titulo del articulo es requerido']
    },
    'imageUrl': {
        type: String,
        required: [true, 'La url de la imagen es requerida']
    },
    'comments': [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    'story': {
        type: String,
        required: [true, 'El cuerpo del articulo es requerido']
    },
    'featured': {
        type: Boolean,
        default: false
    },
    'category': {
        type: String,
        required: [true, 'La categoria del articulo es requerida']
    },
    'creationDate': {
        type: Date,
        default: Date.now()
    },
    'isActive': {
        type: Boolean,
        default: true
    }
});

articleSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.creationDate;
    delete obj.__v;
    delete obj.isActive;
    return obj;
};

module.exports = Mongoose.model('Article', articleSchema);
