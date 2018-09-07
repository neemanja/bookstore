import moongose from 'mongoose';

var Schema = new moongose.Schema({
    name: String,
    description: String,
    status: {
        type: Number,
        default:'0'
    }
});

export default moongose.model('Category', Schema)