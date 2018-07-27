import moongose from 'mongoose';

var Schema = new moongose.Schema({
    name: String,
    description: String
});

export default moongose.model('Category', Schema)