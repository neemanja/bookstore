import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

var Schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true,
        
    },
    isAdmin:{
        type: Number,
        default: '0'
    },
    hash: String,
    salt: String
});

Schema.methods.setPassword = password => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

Schema.methods.validPassword = password => {
    let  hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

Schema.methods.generateJwt = () => {
    let expiry = new Date();
    expiry.setDate(expiry.getDate()+1);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        isAdmin: this.isAdmin,
        exp: parseInt(expiry.getTime() / 1000),
    }, 'Bookstote_secret');
};

export default mongoose.model('User', Schema);
