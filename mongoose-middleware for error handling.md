
const express = require('express');

const routes = require('./routes/routes');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/muber');

app.use(bodyParser.json());

routes(app);
//route the request to routes

app.use((err,req,res,next)=>{
    res.status(422).send({error: err.message })

})



module.exports = app;

# drivercontroller
#### calling next function if something goes wrong

const Driver = require('../models/driver');

module.exports ={
        create(req, res,next){
            
            
            const driverProps = req.body;
            Driver.create(driverProps) 
               .then(driver => res.send(driver))
               .catch(next);

        },

    greeting(req,res){

        
        res.send({hi:'there'})
    } 


};
