

# home :       
GET : http://localhost:3000/

## Find chat room :  
GET : http://localhost:3000/admin/rooms 

## CREATE a chat room : 
GET : http://localhost:3000/admin/rooms/add

POST : http://localhost:3000/admin/rooms/add

## EDIT chat room :
'/admin/rooms/edit/:id'
GET : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb
POST : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb

## DELETE chat room :
GET : /admin/rooms/delete/:id


## views :
   layout.jade
   index.jade
   rooms.jade
   add.jade
   edit.jade
.......................................................   

## Steps :

We need a body parser to parse the request :

https://expressjs.com/en/resources/middleware/body-parser.html
https://www.npmjs.com/package/qs#readme
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

```javascript

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));  //Change accepted type for parsers
  
```
 
.................................
# CREATE room cycle
## CREATE a chat room : 

in rooms.jade

```javascript
h1 Chat Rooms
    a.btn.btn-primary(href="/admin/rooms/add") Create a new chat room
    
```
    
clicking on this button sends a GET request , GET : http://localhost:3000/admin/rooms/add   

```javascript

GET : http://localhost:3000/admin/rooms/add 

app.get('/admin/rooms/add', function (req, res) {
    res.render("add");  //add.jade
});



in add.jade

form(method="post")

POST : http://localhost:3000/admin/rooms/add  
  
app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);                      //var rooms = require("./data/rooms.json");

    res.redirect("/admin/rooms");    // redirect to rooms.jade,  sends a GET request to http://localhost:3000/admin/rooms
});


After POST , // redirect to rooms.jade,  sends a GET request to http://localhost:3000/admin/rooms

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms         // sends the updated rooms data
    });
});

```


//create room cycle ends here
............................................................

# EDIT room cycle






























   
   
   
   
   
   
   
