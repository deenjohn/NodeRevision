

# routes.js

app.put('/api/drivers/:id',DriverController.edit );

# driver_controller.js

edit(req,res,next){
        const driverid = req.params.id;
        console.log('edit handler');
        console.log(driverid);
        const driverProps = req.body;
        console.log(driverProps);
        Driver.findByIdAndUpdate({_id : driverid}, driverProps)
            .then(() => Driver.findById({_id:driverid}))
            .then(driver => res.send(driver))
            .catch(next);
       
        /*Driver.findByIdAndUpdate({_id : driverid} , driverProps)
         .then(()=>Driver.findById({_id : driverid}))
         .catch(next);*/

    }
    
    
    
# test


 it.only('PUT to api/drivers/id edits an existing driver' ,done =>{
 
      const driver = new Driver({email: 'PUT@gmail.com' , driving : 'false'});
      driver.save() 
        .then(()=>{ 
            request(app)
                .put('/api/drivers/'+driver._id)
                .send({driving:true})
                .end(()=>{
                    Driver.findOne({email:'PUT@gmail.com'})
                     .then(
                         driver =>{
                         assert(driver.driving === true);
                         done();
                     }) 
                })
                // done();
        });

   });
