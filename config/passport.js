import passport from 'passport';
import localStrategy from 'passport-local';
import mongoose from 'mongoose';
import User from '../models/user.model';

passport.use(new localStrategy({
    usernameField: 'email'
},
(username, password, done) => {
    User.findOne({email: username}, (err, user) => {
        if(err){
            return done(err);
        }

        if(!user){
            return done(null, false, {
                message: 'User not found'
            });
        }

        if(!user.validPassword(password)){
            return done(null, false, {
                message: 'Password is wrong'
            });
        }

        return done(null, user);
    });
}));