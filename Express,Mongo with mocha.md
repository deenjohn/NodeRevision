
# app.js
const express = require('express');
const app = express();


app.get('/api' , (req,res)=>{

res.send({hi :'there'});
})

module.exports = app;


# test
const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const fs = require('fs');


describe('The express app' , ()=>{

    it('handles a GET request to /api ' , (done) =>{
        request(app)
        .get('/api')
        .end((err,response) => {
    
          console.log(response.body)
           assert(response.body.hi =='there')
          done();

        }) 

    })

});
............................................................

#### routes.js
  app.post('/api/drivers' , DriverController.create);

#### driver_controller.js

module.exports ={
        create(req, res){
            
            console.log(req.body)
            res.send({hi:'there posting'});

        },

    greeting(req,res){

        
        res.send({hi:'there'})
    } 


};
        
  #### 
  
#### test
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');



describe('driver controller' , ()=>{

    it('POST to api/drivers to create a driver', done =>{

      request(app)
        .post('/api/drivers')
        .send({email : 'dj@gmail.com'})
        .end((err,res)=>{
            assert(res.body.hi ==='there posting')
         done();
        })

    });


});








