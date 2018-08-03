import express from 'express';
import path from  'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bb from  'express-busboy';
import SoureMapSupport from 'source-map-support';

import api from './routes/api.route';
import passport from 'passport';

import './config/passport';

const app = express();

bb.extend(app)

//alows-cors
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();    
})

//configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3001;

//conect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bookstore', {useMongoClient:true});

SoureMapSupport.install();

app.use(passport.initialize());
app.use('/api', api);


app.get('/', (req,res) => {
return res.end('Api working');
})

//Autorization
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({'message':err.name + ': ' + err.message});
    }
});


// catch 404
app.use((req, res, next) => {
res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
app.listen(port,() => {
console.log(`App Server Listening at ${port}`);
});