import mongoose from 'mongoose';
import User from '../models/user.model';
import passport from 'passport';

export const register = (req, res) => {

    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }

        if(user){
            return res.status(409).json({status:409, 'success':true, 'message':'Email is used'});
        }

        else{
            const newUser = new User();

            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.setPassword(req.body.password);

            newUser.save(err => {
                let token;
                token = newUser.generateJwt();
                if(err){
                    return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
                }
                return res.status(201).json({status:201, 'success':true, 'message':'Registration successfully', token})
            })
        }
    });


    
}

export const login = (req, res) => {
    passport.authenticate('local', (err, user, info)=>{
        let token;

        if(err){
            return res.status(404).json({status:404, 'success':false, 'message':'Some error'});
        }

        if(user){
            token = user.generateJwt();
            res.status(200).json({status:200, 'success':true, 'message':'Loggin successfully', token})        
        }
        else{
            res.status(401).json(info);
        }
    })(req, res);
};