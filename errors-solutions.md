
## 1) use slash before route path :

### wrong :
    app.post('api/drivers' , DriverController.create);
this will not be able to reach

### correct :
    app.post('/api/drivers' , DriverController.create);


## 2) module.exports= mongoose.model('Book', bookModel,'Book');

error :
  if you use > mongoose.model('Book', bookModel);  then you will get null.
Solution :
  the last 'Book' is a presxisting collection name in mongodb

## 3) findbyid

     Book.findById({_id: '1'}, function(err,books){
                if(err)
                    res.status(500).send(err);
                else
                    res.send(books._id);
            });
            
  Error :
  {
  "message": "Cast to ObjectId failed for value \"{ _id: '1' }\" at path \"_id\" for model \"Book\"",
  "name": "CastError",
  "stringValue": "\"{ _id: '1' }\"",
  "kind": "ObjectId",
  "value": {
    "_id": "1"
  },
  "path": "_id"
}

Solution :
  














