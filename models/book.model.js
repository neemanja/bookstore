import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    category:{
        type:mongoose.Schema.ObjectId, require: true
    },
    isbn: String,
    cover: String,
    description: String,
    url: String
});

export default mongoose.model('Book', Schema);