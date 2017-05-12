

http://stackoverflow.com/questions/5794834/how-to-access-a-preexisting-collection-with-mongoose

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/local');

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    connection.db.collection("YourCollectionName", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });

})
